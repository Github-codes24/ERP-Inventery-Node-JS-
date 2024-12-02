// inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getAvailableBrandNames, getProductById } = require('../controllers/inventoryController'); 
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);


// Route for getting available brand names
router.get('/brands', getAvailableBrandNames);
router.get('/getProductById',getProductById);

module.exports = router;
