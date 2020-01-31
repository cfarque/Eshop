const express = require("express");
const router = express.Router();

const Category = require("../Models/Category");
const Department = require("../Models/Department");
const Product = require("../Models/Product");
const User = require("../Models/User");
const Review = require("../Models/Review");

//CRUD

//CREATE

router.post("/user/create", async (req, res) => {
  try {
    const newUser = new User({
      username: req.fields.username,
      email: req.fields.email
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
