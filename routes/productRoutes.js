const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel'); 
const upload = require('../middleware/uploadMiddleware');
const {
  getProducts,
  getProductById,
  // createProduct,
  // updateProduct,
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

router.post('/', uploadMiddleware.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'productBrochure', maxCount: 1 },
    { name: 'pptAvailable', maxCount: 1 },
    { name: 'coveringLetter', maxCount: 1 },
    { name: 'isoCertificate', maxCount: 1 }
]), async (req, res) => {
    try {
        const newProduct = new Product({
            ...req.body,
            productImage: req.files.productImage ? req.files.productImage[0].path : undefined,
            productBrochure: req.files.productBrochure ? req.files.productBrochure[0].path : undefined,
            pptAvailable: req.files.pptAvailable ? req.files.pptAvailable[0].path : undefined,
            coveringLetter: req.files.coveringLetter ? req.files.coveringLetter[0].path : undefined,
            isoCertificate: req.files.isoCertificate ? req.files.isoCertificate[0].path : undefined,
        });

        await newProduct.save();
        res.status(201).json(newProduct); 
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating product' });
    }
});

router.put('/:id', uploadMiddleware.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'productBrochure', maxCount: 1 },
    { name: 'pptAvailable', maxCount: 1 },
    { name: 'coveringLetter', maxCount: 1 },
    { name: 'isoCertificate', maxCount: 1 }
]), async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = {
            ...req.body,
            productImage: req.files.productImage ? req.files.productImage[0].path : undefined,
            productBrochure: req.files.productBrochure ? req.files.productBrochure[0].path : undefined,
            pptAvailable: req.files.pptAvailable ? req.files.pptAvailable[0].path : undefined,
            coveringLetter: req.files.coveringLetter ? req.files.coveringLetter[0].path : undefined,
            isoCertificate: req.files.isoCertificate ? req.files.isoCertificate[0].path : undefined,
        };

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating product' });
    }
});


router.get('/', getProducts);

router.get('/:id', getProductById);

module.exports = router;
