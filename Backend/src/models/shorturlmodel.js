import mongoose from "mongoose";

const shorturlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const shortUrl = mongoose.model("shortUrl", shorturlSchema);

export { shortUrl };
