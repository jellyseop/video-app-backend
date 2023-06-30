import Subscription from "../database/models/Subscription";

const subscribeUser = async ({ subscriber, channel }) => {
  try {
    await Subscription.create({ subscriber, channel });
    return;
  } catch (error) {}
};

export default {
  subscribeUser,
};
