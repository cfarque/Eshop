const express = require("express");
const router = express.Router();

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
const createFilter = req => {
  const filter = {};
  if (req.query.priceMin) {
    filter.price = {};
    filter.price.$gte = req.query.priceMin;
  }
  if (req.query.priceMax) {
    if (filter.price === undefined) {
      filter.price = {};
    }
    filter.price.$lte = req.query.priceMax;
  }
  if (req.query.title) {
    filter.title = new RegExp(req.query.title, "i");
  }
  if (req.query.category) {
    filter.category = req.query.category;
  }
  return filter;
};
//READ  new RegExp ("", "i")
router.get("/product", async (req, res) => {
  try {
    const filters = createFilter(req);
    const search = Product.find(filters).populate("category");
    if (req.query.sort === "price-asc") {
      search.sort({ price: 1 });
    } else if (req.query.sort === "price-desc") {
      search.sort({ price: -1 });
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
    if (req.query.id) {
      const productToUpdate = await Product.findById({ id: req.query.id });
      productToUpdate.title = req.fields.title;
      productToUpdate.description = req.fields.description;
      productToUpdate.price = req.fields.price;
      productToUpdate.category = req.fields.category;
      await productToUpdate.save();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//DELETE
router.post("/product/delete", async (req, res) => {
  try {
    const productToDelete = await Product.findById({ id: req.query.id });
    await productToDelete.remove();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
