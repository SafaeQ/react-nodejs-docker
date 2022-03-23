const bcrypt = require("bcryptjs");

const Customer = require("../../models/customer");
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
    const customer = new Customer({
      name,
      email,
      password: hashedPassword,
    });
    const savedCustomer = await customer.save();
    if (savedCustomer) {
      return res.status(200).json(result("success", { savedCustomer }));
    }
    return res.status(400).json(result("error", "Oops something went wrong!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingCustomer = await Customer.findOne({ email: email });
    if (!existingCustomer)
      return res
        .status(401)
        .json(result("error", "Email or Password incorrect!"));
    const checkEmail = await bcrypt.compare(
      password,
      existingCustomer.password
    );
    if (!checkEmail)
      return res
        .status(401)
        .json(result("error", "Email or Password incorrect!"));
    req.session.customer = {
      id: existingCustomer._id,
      email: existingCustomer.email,
    };
    req.session.isCustomerAuthenticated = true;
    req.session.save(() => {
      return res.status(200).json(result("success", "You are logged in!"));
    });
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const logout = (req, res) => {
  if (req.session.customer === null || !req.session.isCustomerAuthenticated) {
    return res.status(400).json(result("error", "You are not logged in!"));
  }
  try {
    req.session.customer = null;
    req.session.isCustomerAuthenticated = false;
    res.status(200).json(result("success", "You are logged out!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const profilePage = async (req, res) => {
  const id = req.session.customer.id;
  try {
    const customer = await Customer.findById(id);
    if (customer) {
      return res.json(result("success", { customer }));
    }
    return res.status(400).json(result("error", "No session found!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  passwordReset.generateLink(email, Customer, res, "customer");
};

const ResetPasswordPage = async (req, res) => {
  const { id, token } = req.params;
  passwordReset.resetPasswordPage(id, Customer, res, token);
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  passwordReset.newPassword(id, Customer, token, req.body, res);
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
