const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("./sendEmail");
const dotenv = require("dotenv");

dotenv.config();

const Admin = require("../models/admin");

const resetPasswordValidation = require("../validations/resetPassword");

const result = (status, output) => {
  return {
    status,
    output,
  };
};

const generateLink = async (email, userRole, res, userRoleInLink) => {
  const existingUser = await userRole.findOne({ email: email });
  if (!existingUser)
    return res.status(401).json(result("error", "Email incorrect!"));
  // ! admin exist and create a one time link valid for 15 min
  const secret = process.env.JWT_SECRET + existingUser.password;
  const token = jwt.sign(
    { _id: existingUser._id, email: existingUser.email },
    secret,
    {
      expiresIn: "15m",
    }
  );
  const link = `http://localhost:3000/${userRoleInLink}/reset-password/${existingUser._id}/${token}`;
  sendMail(link, existingUser.email).then(() => {
    res.status(200).json(result("success", link));
  });
};

const resetPasswordPage = async (id, userRole, res, token) => {
  const existingUser = await userRole.findOne({ _id: id });
  if (!existingUser)
    return res.status(401).json(result("error", "Email incorrect!"));
  const secret = process.env.JWT_SECRET + existingUser.password;
  try {
    const checkToken = jwt.verify(token, secret);
    if (checkToken)
      return res
        .status(200)
        .json(result("success", "Please enter your new password"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

const newPassword = async (
  id,
  userRole,
  token,
  { password, confirmPassword },
  res
) => {
  const existingUser = await userRole.findOne({ _id: id });
  if (!existingUser)
    return res.status(401).json(result("error", "Email incorrect!"));
  const secret = process.env.JWT_SECRET + existingUser.password;
  try {
    const checkToken = jwt.verify(token, secret);
    if (checkToken) {
      const { error } = resetPasswordValidation.resetPassword({
        password,
        confirmPassword,
      });
      if (error)
        return res.status(400).json(result("error", error.details[0].message));
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedUser = await userRole.findByIdAndUpdate(id, {
        password: hashedPassword,
      });
    }
    res.status(200).json(result("success", "updated successfully!"));
  } catch (error) {
    return res.status(400).json(result("error", error.message));
  }
};

module.exports = {
  generateLink: generateLink,
  resetPasswordPage: resetPasswordPage,
  newPassword: newPassword,
};
