import userService from "@src/services/user-service";

const createUser = async (req, res) => {
  try {
    const { email, username, password, profileImageUrl } = req.body;

    const result = await userService.createUser({
      email,
      username,
      password,
      profileImageUrl,
    });

    res.status(201).json(result);
  } catch ({ statusCode, message }) {
    res.status(statusCode).json({ ok: false, error: message });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.loginUser({ email, password });

    if (!result.ok) {
      res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    req.session.loggedIn = true;
    req.session.user = result.user;

    res.status(200).json(result);
  } catch ({ statusCode, message }) {
    res.status(statusCode).json({ ok: false, error: message });
  }
};

// User logout
const logoutUser = async (req, res) => {
  try {
    const { session } = req;
    await userService.logoutUser(session);

    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ message: "Logout successful" });
  } catch ({ statusCode, message }) {
    res.status(statusCode).json({ ok: false, error: message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById({ id });

    res.status(200).json(user);
  } catch ({ statusCode, message }) {
    res.status(statusCode).json({ ok: false, error: message });
  }
};

// Update a user
const updateUserById = async (req, res) => {
  try {
    const {
      body: { username, email },
      file,
      session: {
        user: { _id, profileImageUrl },
      },
    } = req;

    await userService.updateUserById({
      _id,
      username,
      email,
      file,
      profileImageUrl,
    });

    res.status(200).json({ message: "Profile updated successfully." });
  } catch ({ statusCode, message }) {
    res.status(statusCode).json({ ok: false, message });
  }
};

// Delete a user
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    await userService.deleteUserById({ id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch ({ statusCode, message }) {
    res.status(statusCode).json({ ok: false, message });
  }
};

const getSubscribedUsers = (req, res) => {};
const subscribeUser = (req, res) => {};
/* const subscribeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user.id; // Assuming you have implemented user authentication and have access to the logged-in user's ID

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found" });
    }

    const existingSubscription = await Subscription.findOne({
      subscriber: loggedInUserId,
      channel: targetUser._id,
    });
    if (existingSubscription) {
      return res.status(400).json({ error: "Already subscribed to this user" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const subscription = new Subscription({
      subscriber: loggedInUserId,
      channel: targetUser._id,
    });

    try {
      await subscription.save({ session });

      targetUser.meta.subscribers += 1;
      await targetUser.save({ session });

      await User.findByIdAndUpdate(
        loggedInUserId,
        { $push: { subscribes: subscription._id } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: "User subscribed successfully" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred during subscribe." });
  }
}; */

const unsubscribeUser = (req, res) => {};

export default {
  createUser,
  loginUser,
  logoutUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getSubscribedUsers,
  subscribeUser,
  unsubscribeUser,
};
