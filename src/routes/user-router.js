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

const router = express.Router();

router.post("/logout", logoutUser);

router
  .route("/:id")
  .get(getUserById)
  .all(authenticateUser, authorizeUser)
  .put(updateUser)
  .delete(deleteUser);

router.put(
  "/:id/change-password",
  authenticateUser,
  authorizeUser,
  changePassword
);

export default router;
