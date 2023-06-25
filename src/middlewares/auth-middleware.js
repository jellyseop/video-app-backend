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
