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
    getProductList,
    getStockNames,
    getNewSrNumber,
    getModelName
} = require('../controllers/productController');

// More specific routes first
// router.get('/top-selling', getTopSellingProducts);
router.get('/emergency-required', getEmergencyRequiredProducts);
router.get('/product-details', getProductDetails);
router.get('/getModelName', getModelName);

// Generic routes last
router.get('/getProducts', getProducts); // Get all products
router.get('/getProductById/:id', getProductById); // Get product by ID

// Route for creating a new product with file uploads
router.post('/createProduct', upload.fields([
    { name: 'productImage' },
    { name: 'productBrochure' },
    { name: 'pptAvailable' },
    { name: 'coveringLetter' },
    { name: 'isoCertificate' }
]), createProduct);

// Route for updating a product by ID
router.get("/getStockNames",getStockNames);

router.put('/updateProduct/:id', updateProduct);

router.get('/getSrNoForProduct', getNewSrNumber);


module.exports = router