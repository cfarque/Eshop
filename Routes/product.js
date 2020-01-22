const express = require("express");
const router = express.Router();

const Category = require("../Models/Category");
const Department = require("../Models/Department");
const Product = require("../Models/Product");

//CRUD

//CREATE
router.post("/product/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      category: req.fields.category
    });
    await newProduct.save();
    res.json({ message: "New Product is created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//READ  new RegExp ("", "i")
router.get("/product", async (req, res) => {
  try {
    const search = Product.find().populate("category");
    if (req.query.category) {
      const products = await Product.find({
        category: req.query.category
      }).populate("category");
    }
    if (req.query.title) {
      const products = await Product.find({
        title: new RegExp(req.query.title, "i")
      });
    }
    if (req.query.priceMin) {
      const products = await Product.find({ price: { $gte: req.query.price } });
    }
    if (req.query.priceMax) {
      const products = await Product.find({
        price: { $lte: req.query.price }
      });
      if (req.query.sort === "price-asc") {
        search.sort({ price: 1 });
      }
    } else {
      const products = await Product.find({
        category: req.query.category
      }).populate("category");
    }
    const products = await search;
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//UPDATE
router.post("/product/update", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//DELETE
router.post("/product/delete", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
