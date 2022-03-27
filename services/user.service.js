const httpStatus = require("http-status");
const { User, Activity } = require("../models");

const all = async () => {
  const aggregated = await User.aggregate([
    { $match: { role: "user" } },

    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "userId",
        as: "products",
      },
    },
  ]);

  return {
    status: httpStatus.OK,
    data: aggregated,
  };
};

const getActivity = async (userId) => {
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    return { status: httpStatus.NOT_FOUND, message: `User Not found` };
  }
  const activity = await Activity.find({ userId: userId });
  const newActivity = activity.map((a) => {
    return { ...a._doc };
  });
  return {
    status: httpStatus.OK,
    data: {
      lastLoginDate: foundUser.lastLoginDate,
      lastLogoutDate: foundUser.lastLogoutDate,
      name: foundUser.name,
      activity: newActivity,
    },
  };
};

const update = async (data) => {
  try {
    const updated = await User.findByIdAndUpdate(data._id || data.id, data);
    return {
      status: httpStatus.OK,
      message: "User Updated Successfully",
      data: updated,
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const remove = async (data) => {
  try {
    await User.findByIdAndDelete(data._id || data.id);
    return { status: httpStatus.OK, message: "User Deleted Successfully" };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
  update,
  remove,
  getActivity,
};
