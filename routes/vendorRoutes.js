const express = require("express");
const { create, getAllVendors, findVendor, updateVendor } = require("../controllers/vendorController.js");

const route = express.Router();

route.post("/create", create);
route.get("/display", getAllVendors);
route.get("/find", findVendor);
route.put("/update/:id", updateVendor);

module.exports = route;
