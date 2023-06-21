import express from "express";
import userController from "../controllers/user-controller";

const router = express.Router();

router.get("/", (req, res) => res.send("Hello world"));
router.post("/join", userController.createUser);
router.post("/login", userController.login);

export default router;
