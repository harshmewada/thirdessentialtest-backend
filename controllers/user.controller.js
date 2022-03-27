const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const all = catchAsync(async (req, res) => {
  const result = await userService.all(req.userId);
  return res.status(result.status).send(result);
});
const update = catchAsync(async (req, res) => {
  const result = await userService.update(req.body);
  await res.status(result.status).send(result);
});

const remove = catchAsync(async (req, res) => {
  const result = await userService.remove(req.body);
  await res.status(result.status).send(result);
});
const getActivity = catchAsync(async (req, res) => {
  const result = await userService.getActivity(req.query.id);
  await res.status(result.status).send(result);
});

module.exports = {
  all,
  update,
  remove,
  getActivity,
};
