const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
//import file system
const fs = require('fs');

//controller
const uploadProductImageLocal = async (req, res) => {
  //check if file exists
  if (!req.files) {
    throw CustomError.BadRequestError("no file uploaded");
  }
  //console log req.files, you can finally see the image, the name, the data, size, etc. use .mv (move) to store it on our server.
  //then make it publically available.
  const productImage = req.files.image;

  //check format of image
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("please upload an image");
  }
  //create a path to pass to the mv function. looking for the path whree the image needs to be moved, then name
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  //check size
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "upload needs to be smaller than 1MB"
    );
  }

  await productImage.mv(imagePath);
  //now send back correct path to frontend, so backend can grab path for product creation
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  //1st arg is path for images.
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      //stores in a folder
      folder: "file-upload",
    }
  );
  //removes temp files, not stored locally any longer
  fs.unlinkSync(req.files.image.tempFilePath);
  //return to front end
  return res.status(StatusCodes.OK).json({image: {src: result.secure_url}})
};

module.exports = {
  uploadProductImage,
};
