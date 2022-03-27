const httpStatus = require("http-status");
const { Product, Activity } = require("../models");
const { getFilesData } = require("../utils/functions");

const all = async (userId) => {
  try {
    const products = await Product.find({ userId: userId });

    return {
      status: httpStatus.OK,
      data: products,
    };
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const create = async (data, files, userId) => {
  try {
    data.productImage = await getFilesData(files[0]);

    const added = await Product.create({ ...data, userId });
    if (added) {
      const activiy = await Activity.create({
        userId,
        productId: added._id,
        title: `created new Product --> ${added?.productName}`,
      });
      return {
        status: httpStatus.OK,
        message: "Product Added Successfully",
        data: added,
      };
    }
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const update = async (data, files, userId) => {
  try {
    data.productImage = await getFilesData(files[0]);

    const updated = await Product.findByIdAndUpdate(data._id || data.id, data, {
      new: true,
    });
    if (updated) {
      const activiy = await Activity.create({
        userId,
        productId: updated._id,
        title: `updated Product --> ${updated?.productName}`,
      });
      return { status: httpStatus.OK, message: "Product Updated Successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

const remove = async (data, userId) => {
  try {
    const deleted = await Product.findByIdAndDelete(data._id || data.id);
    if (deleted) {
      const activiy = await Activity.create({
        userId,
        productId: deleted._id,
        title: `deleted Product --> ${deleted?.productName}`,
      });
    }
    return { status: httpStatus.OK, message: "Product Deleted Successfully" };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  all,
  create,
  update,
  remove,
};
