import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 500,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
messageSchema.index({ userID: 1, createdAt: -1 });

const messageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default messageModel;
