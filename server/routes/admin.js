const router = require("express").Router();

const adminController = require("../controllers/admin/auth");
const middleware = require("../middlewares/auth");

router.route("/register").post(adminController.register);
router.route("/login").post(adminController.login);
router.route("/logout").post(adminController.logout);
router
  .route("/profile")
  .get(middleware.isAdminAuthenticated, adminController.profilePage);
router.route("/forget-password").post(adminController.forgetPassword);
router
  .route("/reset-password/:id/:token")
  .get(adminController.ResetPasswordPage)
  .post(adminController.resetPassword);
module.exports = router;
