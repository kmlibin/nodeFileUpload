//grab model
const Product = require("../models/Product");

//status codes
const { StatusCodes } = require("http-status-codes");

//controller
const createProduct = async (req, res) => {
  res.send("create product");
};
const getAllProducts = async (req, res) => {
  res.send("get all products");
};


module.exports = {
    createProduct,
    getAllProducts
}