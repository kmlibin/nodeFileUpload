const path = require('path');
const {StatusCodes} = require('http-status-codes');

//controller
const uploadProductImage = async (req, res) => {
    //console log req.files, you can finally see the image, the name, the data, size, etc. use .mv (move) to store it on our server.
    //then make it publically available.
    let productImage = req.files.image;
    //create a path to pass to the mv function. looking for the path whree the image needs to be moved, then name
    const imagePath = path.join(__dirname, '../public/uploads/'+`${productImage.name}`);
    await productImage.mv(imagePath);
    //now send back correct path

    return res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}})
};


module.exports ={
    uploadProductImage,
   
}