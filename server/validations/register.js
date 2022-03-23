const Joi = require("@hapi/joi");

const register = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    confirmEmail: Joi.equal(Joi.ref("email"))
      .required()
      .label("Confirm email")
      .options({ messages: { "any.only": "Confirm email does not match" } }),
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
  register: register,
};
