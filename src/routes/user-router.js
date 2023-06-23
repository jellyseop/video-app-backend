import express from "express";
import userController from "../controllers/user-controller";
("../controllers/user-controller");

const router = express.Router();

router.post("/logout", userController.logoutUser);

router.get("/:id", userController.getUserById);

// PUT /users/:id
router.put("/:id", userController.updateUser);

// DELETE /users/:id
router.delete("/:id", userController.deleteUser);

export default router;
