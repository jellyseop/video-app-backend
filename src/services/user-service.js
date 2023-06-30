import User from "../database/models/User.js";

const createUser = async ({ email, username, password, profileImageUrl }) => {
  try {
    const isExist = await User.findOne({ $or: [{ email }, { username }] });
    if (isExist) {
      throw {
        statusCode: 409,
        message: "Email or username already taken",
      };
    }

    await User.create({
      email,
      username,
      password,
      profileImageUrl: profileImageUrl || null,
    });

    return { ok: true };
  } catch (error) {
    throw {
      CREATE_USER_ERROR: {
        statusCode: 500,
        message: "Failed to create user",
      },
    };
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        statusCode: 400,
        message: "Invalid email",
      };
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw {
        statusCode: 400,
        message: "Invalid password",
      };
    }

    return { ok: true, user };
  } catch (error) {
    throw {
      statusCode: 500,
      message: "Failed to login",
    };
  }
};

const logoutUser = async ({ session }) => {
  try {
    await session.destroy();

    return;
  } catch (error) {
    throw {
      statusCode: 500,
      message: "Failed to logout",
    };
  }
};

const getUserById = async ({ id }) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    return user;
  } catch (error) {
    throw {
      statusCode: 500,
      message: "Failed to fetch user",
    };
  }
};

const updateUserById = async ({
  _id,
  username,
  email,
  file,
  profileImageUrl,
}) => {
  try {
    const foundUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: _id },
    });

    if (foundUser) {
      throw {
        statusCode: 409,
        message: "Email or username already taken",
      };
    }

    const updatedFields = {
      email,
      username,
      profileImageUrl: file ? file.path : profileImageUrl,
    };

    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    });

    if (!updatedUser) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    return;
  } catch (error) {
    throw {
      statusCode: 500,
      message: "An error occurred during user update",
    };
  }
};

const deleteUserById = async ({ id }) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }
    return;
  } catch (error) {
    throw {
      statusCode: 500,
      message: "Failed to delete user",
    };
  }
};

export default {
  createUser,
  loginUser,
  logoutUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
