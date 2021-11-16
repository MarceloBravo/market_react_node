//const util = require("util");
const path = require("path");
const multer = require("multer");   //npm install --save multer

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../public/images/avatars`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} no es válido. sólo se aceptan archivos png/jpeg.`;
      return callback(message, null);
    }

    //var filename = `${Date.now()}-bezkoder-${file.originalname}`;
    var filename = file.originalname;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage });
//var mwUploadFiles = util.promisify(uploadFiles);
module.exports = uploadFiles;