const { BadRequestError } = require("../errors");
const validImage = (file, cb) => {
  const allowedExt = ["jpeg", "jpg", "png"];
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

  const fileExtension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );

  const isValidExt = allowedExt.includes(fileExtension);
  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);

  const isValidImage = isValidExt && isValidMimeType;

  return isValidImage
    ? cb(null, true)
    : cb(new BadRequestError("Image must be either png or jpg/jpeg!"), false);
};

module.exports = validImage;
