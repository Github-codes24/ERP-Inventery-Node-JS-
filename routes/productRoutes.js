const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct 
} = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`); 
    }
});

const uploadMiddleware = multer({ storage });

router.post('/',uploadMiddleware.fields([
        { name: 'productImage', maxCount: 1 },
        { name: 'productBrochure', maxCount: 1 },
        { name: 'pptAvailable', maxCount: 1 },
        { name: 'coveringLetter', maxCount: 1 },
        { name: 'isoCertificate', maxCount: 1 }
    ]), 
    createProduct
);

router.put('/:id',uploadMiddleware.fields([
        { name: 'productImage', maxCount: 1 },
        { name: 'productBrochure', maxCount: 1 },
        { name: 'pptAvailable', maxCount: 1 },
        { name: 'coveringLetter', maxCount: 1 },
        { name: 'isoCertificate', maxCount: 1 }
    ]), 
    updateProduct
);

router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
