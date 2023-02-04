import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: String,
  contactName: String,
  timestamp: String,
});

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;
