const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Student", "Admin"],
      default: "Student",
    },
  },
  { timestamps: true }
);

// Configure passport-local-mongoose to use 'email' instead of 'username' for logging in
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);