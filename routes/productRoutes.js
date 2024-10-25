const express = require('express');
const router = express.Router();
const multer = require('multer');

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
} = require('../controllers/productController');



router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', upload.fields([
    { name: 'productImage' },
    { name: 'productBrochure' },
    { name: 'pptAvailable' },
    { name: 'coveringLetter' },
    { name: 'isoCertificate' }
]),createProduct);


// Route for updating a product
router.put('/:id', updateProduct);

// Route for fetching top-selling products
router.get('/top-selling', getTopSellingProducts);

// Route for fetching emergency-required products
router.get('/emergency-required', getEmergencyRequiredProducts);

//route for product details
router.get('/product-details', getProductDetails);

module.exports = router;
