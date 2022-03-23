const router = require("express").Router();

const ownerController = require("../controllers/owner/auth");
const middleware = require("../middlewares/auth");
const { createAccountLimiter } = require("../middlewares/createAccountLimiter");

router.route("/register").post(createAccountLimiter, ownerController.register);
router.route("/login").post(ownerController.login);
router.route("/logout").post(ownerController.logout);
router
  .route("/profile")
  .get(middleware.isOwnerAuthenticated, ownerController.profilePage);
router.route("/forget-password").post(ownerController.forgetPassword);
router
  .route("/reset-password/:id/:token")
  .get(ownerController.ResetPasswordPage)
  .post(ownerController.resetPassword);
module.exports = router;
