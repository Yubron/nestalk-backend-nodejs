const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messages: {
      message: String,
      meta: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          read: Boolean,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Chat", ChatSchema);
module.exports = model;
