import express from "express";
import VideoController from "../controllers/video-controller.js";

const router = express.Router();

// POST /videos
router.post("/", VideoController.createVideo);

router.get("/search", VideoController.searchVideos);

// GET /videos/:id
router.get("/:id", VideoController.getVideoById);

// PUT /videos/:id
router.put("/:id", VideoController.updateVideo);

// DELETE /videos/:id
router.delete("/:id", VideoController.deleteVideo);

export default router;
