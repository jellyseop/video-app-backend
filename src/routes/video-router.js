import express from "express";
import {
  createVideo,
  searchVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} from "../controllers/video-controller.js";
import {
  authenticateUser,
  authorizeVideoEdit,
} from "../middlewares/auth-middleware.js";
import { videoUpload } from "../middlewares/upload-middleware.js";

const router = express.Router();

// POST /videos
router.post("/", authenticateUser, videoUpload.single("video"), createVideo);

router.get("/search", searchVideos);

router
  .route("/:id")
  .all(authenticateUser, authorizeVideoEdit)
  .get(getVideoById)
  .put(updateVideo)
  .delete(deleteVideo);

export default router;
