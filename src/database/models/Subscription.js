import mongoose from "mongoose";
import User from "./User";

const SubscriptionSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
