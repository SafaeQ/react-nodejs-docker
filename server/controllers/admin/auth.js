const bcrypt = require("bcryptjs");

const Admin = require("../../models/admin");
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
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });
    const savedAdmin = await admin.save();
    if (savedAdmin) {
      return res.status(200).json(result("success", { savedAdmin }));
    }
    return res.status(400).json(result("error", "Oops something went wrong!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin)
      return res
        .status(401)
        .json(result("error", "Email or Password incorrect!"));
    const checkEmail = await bcrypt.compare(password, existingAdmin.password);
    if (!checkEmail)
      return res
        .status(401)
        .json(result("error", "Email or Password incorrect!"));
    req.session.admin = { id: existingAdmin._id, email: existingAdmin.email };
    req.session.isAdminAuthenticated = true;
    req.session.save(() => {
      return res.status(200).json(result("success", "You are logged in!"));
    });
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const logout = (req, res) => {
  if (req.session.admin === null || !req.session.isAdminAuthenticated) {
    return res.status(400).json(result("error", "You are not logged in!"));
  }
  try {
    req.session.admin = null;
    req.session.isAdminAuthenticated = false;
    res.status(200).json(result("success", "You are logged out!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const profilePage = async (req, res) => {
  const id = req.session.admin.id;
  try {
    const admin = await Admin.findById(id);
    if (admin) {
      return res.json(result("success", { admin }));
    }
    return res.status(400).json(result("error", "No session found!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  passwordReset.generateLink(email, Admin, res, "admin");
};

const ResetPasswordPage = async (req, res) => {
  const { id, token } = req.params;
  passwordReset.resetPasswordPage(id, Admin, res, token);
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  passwordReset.newPassword(id, Admin, token, req.body, res);
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
