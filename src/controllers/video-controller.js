import Video from "../models/Video.js";

// Create a new video
const createVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const newVideo = await Video.create({ title, description, url });
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create video" });
  }
};

const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;
    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to search videos" });
  }
};

// Get a video by ID
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

// Update a video
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { title, description, url },
      { new: true }
    );
    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update video" });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete video" });
  }
};

export default {
  searchVideos,
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
};
