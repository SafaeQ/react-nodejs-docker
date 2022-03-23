const bcrypt = require("bcryptjs");

const Owner = require("../../models/owner");
const registerValidation = require("../../validations/register");
const passwordReset = require("../../utils/resetPassword");

const result = (status, output) => {
  return {
    status,
    output,
  };
};

const register = async (req, res) => {
  const { error } = registerValidation.register(req.body);
  const { name, email, password } = req.body;
  try {
    if (error) {
      return res.status(400).json(result("error", error.details[0].message));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const owner = new Owner({
      name,
      email,
      password: hashedPassword,
    });
    const savedOwner = await owner.save();
    if (savedOwner) {
      return res.status(200).json(result("success", { savedOwner }));
    }
    return res.status(400).json(result("error", "Oops something went wrong!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingOwner = await Owner.findOne({ email: email });
    if (!existingOwner)
      return res
        .status(401)
        .json(result("error", "Email or Password incorrect!"));
    const checkEmail = await bcrypt.compare(password, existingOwner.password);
    if (!checkEmail)
      return res
        .status(401)
        .json(result("error", "Email or Password incorrect!"));
    req.session.owner = { id: existingOwner._id, email: existingOwner.email };
    req.session.isOwnerAuthenticated = true;
    req.session.save(() => {
      return res.status(200).json(result("success", "You are logged in!"));
    });
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const logout = (req, res) => {
  if (req.session.owner === null || !req.session.isOwnerAuthenticated) {
    return res.status(400).json(result("error", "You are not logged in!"));
  }
  try {
    req.session.owner = null;
    req.session.isOwnerAuthenticated = false;
    res.status(200).json(result("success", "You are logged out!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const profilePage = async (req, res) => {
  const id = req.session.owner.id;
  try {
    const owner = await Owner.findById(id);
    if (owner) {
      return res.json(result("success", { owner }));
    }
    return res.status(400).json(result("error", "No session found!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  passwordReset.generateLink(email, Owner, res, "owner");
};

const ResetPasswordPage = async (req, res) => {
  const { id, token } = req.params;
  passwordReset.resetPasswordPage(id, Owner, res, token);
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  passwordReset.newPassword(id, Owner, token, req.body, res);
};

module.exports = {
  register: register,
  login: login,
  logout: logout,
  profilePage: profilePage,
  forgetPassword: forgetPassword,
  ResetPasswordPage: ResetPasswordPage,
  resetPassword: resetPassword,
};
