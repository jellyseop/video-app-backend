import mongoose from "mongoose";
import { hashPassword } from "@src/utils/bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    subscribes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    meta: {
      subscribers: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
