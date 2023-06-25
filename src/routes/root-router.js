import express from "express";
import { createUser, login } from "../controllers/user-controller";

const router = express.Router();

router.get("/", (req, res) => res.send("Hello world"));
router.post("/join", createUser);
router.post("/login", login);

export default router;
