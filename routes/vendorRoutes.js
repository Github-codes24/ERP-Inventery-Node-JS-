const express = require("express");
const { createVendor, findVendor, updateVendor, getVendorById } = require("../controllers/vendorController.js");

const route = express.Router();

route.post("/createVendor", createVendor);
route.get("/getVendorByQuery", findVendor);
route.get("/getVendorById/:id", getVendorById);
route.put("/updateVendor/:id", updateVendor);

module.exports = route;