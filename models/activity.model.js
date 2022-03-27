const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    action: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: false,
    },
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.plugin(toJSON);
activitySchema.plugin(paginate);

const User = mongoose.model("Activity", activitySchema);

module.exports = User;
