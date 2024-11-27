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
<<<<<<< HEAD
    getRequiredEmergencyProducts,
    getStockNames
    

=======
    getStockNames,
    getNewSrNumber
>>>>>>> f58a05f49eb07b9c4dcb18e518e1a751bb1ea044
} = require('../controllers/productController');

// More specific routes first
// router.get('/top-selling', getTopSellingProducts);
router.get('/getRequiredEmergencyProducts',getRequiredEmergencyProducts);
router.get('/getProductDetails', getProductDetails);


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
<<<<<<< HEAD
router.put('/:id', updateProduct);
router.get("/getStockNames",getStockNames);
=======
router.get("/getStockNames",getStockNames);

router.put('/updateProduct/:id', updateProduct);

router.get('/getSrNoForProduct', getNewSrNumber);

>>>>>>> f58a05f49eb07b9c4dcb18e518e1a751bb1ea044

module.exports = router
