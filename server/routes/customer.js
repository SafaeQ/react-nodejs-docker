const router = require("express").Router();

const customerController = require("../controllers/customer/auth");
const middleware = require("../middlewares/auth");
const { createAccountLimiter } = require("../middlewares/createAccountLimiter");

router
  .route("/register")
  .post(createAccountLimiter, customerController.register);
router.route("/login").post(customerController.login);
router.route("/logout").post(customerController.logout);
router
  .route("/profile")
  .get(middleware.isCustomerAuthenticated, customerController.profilePage);
router.route("/forget-password").post(customerController.forgetPassword);
router
  .route("/reset-password/:id/:token")
  .get(customerController.ResetPasswordPage)
  .post(customerController.resetPassword);
module.exports = router;
