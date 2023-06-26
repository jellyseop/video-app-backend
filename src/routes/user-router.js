import express from "express";
import {
  changePassword,
  deleteUser,
  getUserById,
  logoutUser,
  updateUser,
} from "../controllers/user-controller";
import {
  authenticateUser,
  authorizeUser,
} from "../middlewares/auth-middleware";
import { profileUpload } from "../middlewares/upload-middleware";

const router = express.Router();

router.post("/logout", logoutUser);

router
  .route("/:id")
  .get(getUserById)
  .all(authenticateUser, authorizeUser)
  .put(profileUpload.single("profileImage"), updateUser)
  .delete(deleteUser);

router.put("/change-password", authenticateUser, changePassword);

export default router;
