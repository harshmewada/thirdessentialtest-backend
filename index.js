const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "files",
    });
    global.bucket = bucket;
  });
});
mongoose.set("useFindAndModify", false);
