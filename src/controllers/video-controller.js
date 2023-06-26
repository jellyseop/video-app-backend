import Video from "../models/Video.js";

// Create a new video
export const createVideo = async (req, res) => {
  try {
    const {
      body: { title, description, hashtags },
      file: { path },
      session: { user },
    } = req;
    console.log("file :>> ", path);

    const newVideo = await Video.create({
      title,
      description,
      videoUrl: path,
      hashtags,
      user,
    });
    res.status(201).json(newVideo);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Failed to create video" });
  }
};

export const searchVideos = async (req, res) => {
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
export const getVideoById = async (req, res) => {
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
export const updateVideo = async (req, res) => {
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
export const deleteVideo = async (req, res) => {
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
