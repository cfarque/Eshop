const express = require("express");
const router = express.Router();

const Category = require("../Models/Category");
const Department = require("../Models/Department");
const Product = require("../Models/Product");

//CRUD

//CREATE
router.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.fields.title
    });
    await newDepartment.save();
    res.json({ message: "Department created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//READ

router.get("/department", async (req, res) => {
  try {
    const allDepartment = await Department.find();
    res.json(allDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPDATE

router.post("/department/update", async (req, res) => {
  try {
    const departmentToUpdate = await Department.findOne({ id: req.query._id });
    departmentToUpdate.title = req.fields.title;
    res.json(departmentToUpdate);
    await departmentToUpdate.save();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE

router.post("department/delete", async (req, res) => {
  try {
    const idDepartmentToDelete = req.query._id;
    const departmentToDelete = await Department.findOne({
      _id: idDepartmentToDelete
    });
    const categoryToDelete = await Category.find({
      department: idDepartmentToDelete
    });
    categoryToDelete.forEach(async category => {
      const productToDelete = await Product.find({ category: category._id });
      productToDelete.forEach(product => {
        product.remove();
      });
      category.remove();
      await departmentToDelete.remove();

      res.json({ message: "Department deleted" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
