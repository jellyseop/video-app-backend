import express from "express";
import rootRoutes from "./root-router";
import userRoutes from "./user-router";
import videoRoutes from "./video-router";

const router = express.Router();

router.use("/", rootRoutes);
router.use("/users", userRoutes);
router.use("/videos", videoRoutes);

export default router;
