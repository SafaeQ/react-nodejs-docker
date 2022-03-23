const Joi = require("@hapi/joi");

const resetPassword = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "Confirm password does not match" } }),
  });
  return schema.validate(data);
};
module.exports = {
  resetPassword: resetPassword,
};
