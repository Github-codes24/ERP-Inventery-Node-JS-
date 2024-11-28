// inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getAvailableBrandNames } = require('../controllers/inventoryController'); 
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);


// Route for getting available brand names
router.get('/brands', getAvailableBrandNames);

module.exports = router;
