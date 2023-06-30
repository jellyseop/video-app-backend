import Video from "@src/database/models/Video";

// Authentication middleware function
const authenticateUser = (req, res, next) => {
  const {
    session: { loggedIn },
  } = req;

  // Check if the user is authenticated
  if (!loggedIn) {
    return res
      .status(403)
      .json({ message: "Authentication required: Please log in." });
  }

  // User is authenticated, proceed to the next middleware or route handler
  next();
};

const authorizeUser = (req, res, next) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;

  if (id !== _id) {
    return res
      .status(403)
      .json({
        message:
          "Authorization failed: You are not authorized to access this resource.",
      });
  }

  // User is authorized, proceed to the next middleware or route handler
  next();
};

const authorizeVideoActions = async (req, res, next) => {
  try {
    // check if the current user is the owner of the video
    const {
      params: { id },
      session: { user },
    } = req;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    if (video.user !== user) {
      return res.status(403).json({ message: "Forbidden: not authorized" });
    }

    next();
  } catch (error) {
    console.error("Error during video authorization:", error);
    res
      .status(500)
      .json({ message: "An error occurred during video authorization" });
  }
};

export default {
  authenticateUser,
  authorizeUser,
  authorizeVideoActions,
};
