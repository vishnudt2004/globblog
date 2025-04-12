// Node module Imports
const path = require("path");
const multer = require("multer");

// Utility Functions
const { generateToken } = require("../utils/tokenUtils");

function fileUpload(basicOptions, fileOptions) {
  const { destination, fileNameLength } = basicOptions;
  const { maxSize, fileTypes } = fileOptions;

  const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      const { originalname } = file;
      const uniqueStr = generateToken({ length: fileNameLength });
      const extName = path.extname(originalname);
      const fileName = `${uniqueStr}_${Date.now()}${extName}`;

      const error = null;
      cb(error, fileName);
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
      const fileExt = path.extname(file.originalname).toLowerCase();
      const fileTypesRegex = new RegExp(`\\.(${fileTypes.join("|")})$`);

      if (!fileTypesRegex.test(fileExt)) {
        return cb(new Error("INVALID FILE TYPE."), false);
      }

      cb(null, true);
    },
  });
}

module.exports = fileUpload;
