const httpStatus = require("http-status");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  try {
    const findUser = await User.findOne({ email: data.email });
    if (findUser) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "User with this email id already exist",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    await User.create({ ...data, password: hashPassword });
    return {
      status: httpStatus.OK,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error,
    };
  }
};

const login = async (data) => {
  let user = await User.findOneAndUpdate(
    {
      email: data.email,
    },
    {
      lastLoginDate: new Date(),
    }
  );
  if (!user) {
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "User does not exist",
    };
  }
  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword)
    return { status: httpStatus.NOT_FOUND, message: "Invalid password" };
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return {
    status: httpStatus.OK,
    user: user,
    token: token,
    message: "Login Successs",
  };
};

const details = async (data) => {
  let user = await User.findOne({ _id: data });
  if (!user) {
    return { status: httpStatus.NOT_FOUND, message: "user does not exist" };
  }
  return {
    status: httpStatus.OK,
    user: user,
  };
};

const logout = async (data) => {
  let user = await User.findOneAndUpdate(
    { _id: data },
    { lastLogoutDate: new Date() }
  );
  if (!user) {
    return { status: httpStatus.NOT_FOUND, message: "user does not exist" };
  }
  return {
    status: httpStatus.OK,
    message: "Logged Out",
  };
};

module.exports = {
  login,
  details,
  register,
  logout,
};
