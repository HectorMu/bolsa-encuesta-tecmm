const multer = require("multer");

const upload = multer({
  storage: require("../helpers/helpers").multerStorageConfig,
  fileFilter: (_req, file, cb) =>
    require("../helpers/helpers").checkFileType(file, cb),
}).fields([{ name: "cv" }]);

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      console.log(error);
      return res.json({
        status: false,
        statusText: "Solo se aceptan curriculums en formato PDF",
      });
    }
    return next();
  });
};

module.exports = uploadMiddleware;
