const catchAsync = require("../utils/catchAsync");
const { productService } = require("../services");

const all = catchAsync(async (req, res) => {
  const result = await productService.all(req.userId);
  await res.status(result.status).send(result);
});

const create = catchAsync(async (req, res) => {
  const result = await productService.create(req.body, req.files, req.userId);
  await res.status(result.status).send(result);
});

const update = catchAsync(async (req, res) => {
  const result = await productService.update(req.body, req.files, req.userId);
  await res.status(result.status).send(result);
});
const remove = catchAsync(async (req, res) => {
  const result = await productService.remove(req.body, req.userId);
  await res.status(result.status).send(result);
});
module.exports = {
  all,
  create,
  remove,
  update,
};
