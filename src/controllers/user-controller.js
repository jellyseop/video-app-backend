import User from "../models/User.js";
import bcrypt from "bcrypt";

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ ok: false, error: "Invalid email" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({ ok: false, error: "Invalid password" });
    }
    // Implement session or token generation here
    req.session.loggedIn = true;
    req.session.user = user;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

// User logout
export const logoutUser = (req, res) => {
  // Destroy the session and clear the user ID
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ message: "Logout successful" });
  });
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    await User.create({ email, username, password });
    res.status(201).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const {
      body: { username, email },
      session: {
        user: { _id },
      },
    } = req;

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { email, username },
      { new: true }
    );

    // If the user does not exist, return an error
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    req.session.user = updatedUser;
    // Return the updated user as a response
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error during user update:", error);
    res.status(500).json({ message: "An error occurred during user update." });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
