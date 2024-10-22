const express = require("express");
const { create, getAllVendors, findVendor, updateVendor } = require("../controllers/vendorController.js");

const route = express.Router();

route.post("/create", create);
route.get("/getAllVendors", getAllVendors);
route.get("/getByQuery", findVendor);
route.put("/update/:id", updateVendor);

module.exports = route;
