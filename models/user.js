import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  instructor: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("User", UserSchema);
