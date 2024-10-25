const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();


router.get('/search', inventoryController.getProductsByName); // Get products by name
router.get('/:id', inventoryController.getProductById); // Get product by ID


module.exports = router;
