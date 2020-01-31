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
    if (deptOfCat) {
      const newCategory = new Category({
        title: req.fields.title,
        description: req.fields.description,
        department: deptOfCat._id
      });
      await newCategory.save();
      res.json({ message: "Category created" });
    } else {
      res.json({ message: "Department don't exist" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//READ
router.get("/category", async (req, res) => {
  try {
    const allCategory = await Category.find().populate("department");
    res.json(allCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPDATE
router.post("/category/update", async (req, res) => {
  try {
    const categoryToUpdate = await Category.findOne({ _id: req.query.id });
    const newDepartment = await Department.findById(req.fields.department);
    (categoryToUpdate.id = req.query.id),
      (categoryToUpdate.title = req.fields.title),
      (categoryToUpdate.description = req.fields.description),
      (categoryToUpdate.department = newDepartment.id);
    await categoryToUpdate.save();
    res.json({ message: "Category updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
router.post("/category/delete", async (req, res) => {
  try {
    const idToFind = req.query._id;
    const categoryToDelete = await Category.find({ _id: idToFind });
    const productToDelete = await Product.find({
      category: idToFind
    });
    productuToDelete.forEach(product => {
      product.remove();
    });
    await categoryToDelete.remove();

    res.json({ message: "category deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
