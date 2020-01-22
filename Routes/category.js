const express = require("express");
const router = express.Router();

const Category = require("../Models/Category");
const Department = require("../Models/Department");
const Product = require("../Models/Product");

//CRUD

//CREATE
router.post("/category/create", async (req, res) => {
  try {
    const deptOfCat = await Department.findOne({
      title: req.fields.department
    });

    console.log(deptOfCat);
    const newCategory = new Category({
      title: req.fields.title,
      description: req.fields.description,
      department: deptOfCat._id
    });
    await newCategory.save();
    res.json({ message: "Category created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//READ
router.get("/category", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPDATE
router.post("/category/update", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
router.post("/category/delete", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
