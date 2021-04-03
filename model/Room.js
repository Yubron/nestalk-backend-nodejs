const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: "Room Name is required",
    },
    participants: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chats: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Room", RoomSchema);
module.exports = model;
