const catchAsync = require("../utils/catchAsync");
const { authService } = require("../services");

const register = async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(result.status).send(result);
};

const login = async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(result.status).send(result);
};

const details = catchAsync(async (req, res) => {
  const result = await authService.details(req.userId);
  return res.status(result.status).send(result);
});

const logout = catchAsync(async (req, res) => {
  const result = await authService.logout(req.userId);
  return res.status(result.status).send(result);
});

module.exports = {
  login,
  details,
  register,
  logout,
};
