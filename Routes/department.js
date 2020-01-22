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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
