import Video from "../models/Video";

// Authentication middleware function
export const authenticateUser = (req, res, next) => {
  const {
    session: { loggedIn },
  } = req;

  // Check if the user is authenticated
  if (!loggedIn) {
    return res.status(401).json({ message: "not authenticated." });
  }

  // User is authenticated, proceed to the next middleware or route handler
  next();
};

export const authorizeUser = (req, res, next) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;

  if (id !== _id) {
    return res.status(403).json({ message: "not authorized" });
  }

  // User is authorized, proceed to the next middleware or route handler
  next();
};

export const authorizeVideoEdit = async (req, res, next) => {
  try {
    const {
      params: { id },
      session: {
        user: { _id },
      },
    } = req;

    const video = await Video.findById(id).exec();

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    if (video.user.toString() !== _id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit or delete the video." });
    }

    next();
  } catch (error) {}
};
