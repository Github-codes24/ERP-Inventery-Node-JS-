const express = require("express");
const { create, getAllVendors, findVendor, updateVendor, getVendorById } = require("../controllers/vendorController.js");

const route = express.Router();

route.post("/create", create);
route.get("/getByQuery", findVendor);
route.get("/getVendorById/:id", getVendorById);
route.put("/update/:id", updateVendor);

module.exports = route;
