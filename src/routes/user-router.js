import express from "express";
import {
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

export default router;
