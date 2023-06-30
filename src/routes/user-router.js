import express from "express";
import userController from "@src/controllers/user-controller";
import authMiddleware from "@src/routes/middlewares/auth-middlewares";
import uploadMiddleware from "@src/routes/middlewares/upload-middleware";

const router = express.Router();

router.post(
  "/",
  uploadMiddleware.profileUpload.single("profileImage"),
  userController.createUser
);

router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .all(authMiddleware.authenticateUser, authMiddleware.authorizeUser)
  .patch(
    uploadMiddleware.profileUpload.single("profileImage"),
    userController.updateUserById
  )
  .delete(userController.deleteUserById);

router
  .route("/:id/subscription")
  .all(authMiddleware.authenticateUser)
  .get(userController.getSubscribedUsers)
  .post(userController.subscribeUser)
  .delete(authMiddleware.authorizeUser, userController.unsubscribeUser);

export default router;
