const express = require("express");
const { createVendor, findVendor, updateVendor, getVendorById,getNewSrNumber } = require("../controllers/vendorController.js");
const router = express.Router();
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);
router.post("/createVendor", createVendor);
router.get("/getVendorByQuery", findVendor);
router.get("/getVendorById/:id", getVendorById);
router.put("/updateVendor/:id", updateVendor);

router.get("/getSrNoForVendor", getNewSrNumber);

module.exports = router;