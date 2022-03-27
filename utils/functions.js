const httpStatus = require("http-status");

const statusCheck = (status) => {
  return status ? { status: true } : {};
};

const getFilesData = async (files) => {
  if (files) {
    if (Array.isArray(files)) {
      if (files.length > 0) {
        let images = [];
        await files.map(async (file) => {
          const fileName = file.id || file._id;
          images.push(fileName);
        });
        return images;
      } else if (files.id || files._id) {
        return files.id || files._id;
      }
    } else {
      // return compressImages(filess)
      return files.id || files._id;
    }
  }
};

module.exports = {
  getFilesData,
  statusCheck,
};
