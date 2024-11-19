const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ 
    dest: 'uploads/', 
    limits: { fileSize: 10 * 1024 * 1024 } 
});

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    getTopSellingProducts,
    getEmergencyRequiredProducts,
    getProductDetails,
    getProductList
} = require('../controllers/productController');

// More specific routes first
// router.get('/top-selling', getTopSellingProducts);
router.get('/emergency-required', getEmergencyRequiredProducts);
router.get('/product-details', getProductDetails);

// Generic routes last
router.get('/', getProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID

// Route for creating a new product with file uploads
router.post('/createProduct', upload.fields([
    { name: 'productImage' },
    { name: 'productBrochure' },
    { name: 'pptAvailable' },
    { name: 'coveringLetter' },
    { name: 'isoCertificate' }
]), createProduct);

// Route for updating a product by ID
router.put('/:id', updateProduct);

module.exports = router
