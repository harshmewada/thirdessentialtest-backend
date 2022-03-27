const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const config = require("../config/config");
const url = config.mongoose.url;

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    // console.log('file', file);
    return {
      filename: file.originalname,
      bucketName: "files",
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
