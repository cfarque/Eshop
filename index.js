const express = require("express");
const formidableMiddleware = require("express-formidable");
const app = express();
const mongoose = require("mongoose");
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const categoryRoutes = require("./Routes/category");
app.use(categoryRoutes);
const departmentRoutes = require("./Routes/department");
app.use(departmentRoutes);
const productRoutes = require("./Routes/product");
app.use(productRoutes);

app.all("*", (req, res) => {
  res.json({ message: "page not found" });
});

app.listen(3000, () => {
  console.log("Server Started");
});
