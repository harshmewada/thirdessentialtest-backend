const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,

      default: "user",
    },

    password: {
      type: String,
      required: false,
      minlength: 8,
      default: null,
    },
    lastLoginDate: {
      type: Date,
      required: false,
    },
    lastLogoutDate: {
      type: Date,
      required: false,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
