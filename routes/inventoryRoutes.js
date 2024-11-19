// inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getAvailableBrandNames } = require('../controllers/inventoryController'); 

// Route for getting all products
router.get('/products', getAllProducts);

// Route for getting available brand names
router.get('/brands', getAvailableBrandNames);

module.exports = router;