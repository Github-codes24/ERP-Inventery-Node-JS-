const Product = require('../models/productModel');

// Get products by name
const getProducts = async (req, res) => {
    console.log("Received request to search for product:", req.query.productName);
    try {
        const products = await Product.find(req.query);
        res.json(products); // Returns empty array if product not found
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Server Error', error: error.stack || error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Create a new product with file upload
const createProduct = async (req, res) => {
    console.log("Request Body:", req.body); 
    console.log("Files:", req.files); 

    try {
        const product = new Product({
            srNo: req.body.srNo,
            productName: req.body.productName,
            model: req.body.model,
            productType: req.body.productType,
            skuCode: req.body.skuCode,
            amcCmc: req.body.amcCmc,
            companyName: req.body.companyName,
            availableModelNos: req.body.availableModelNos,
            proposedCompany: req.body.proposedCompany,
            hsnSacCode: req.body.hsnSacCode,
            warranty: req.body.warranty,
            expiryDate: req.body.expiryDate,
            amcValidityStartDate: req.body.amcValidityStartDate,
            amcValidityEndDate: req.body.amcValidityEndDate,
            productDescription: req.body.productDescription,
            price: req.body.price,
            quantityUnit: req.body.quantityUnit,
            lastPurchase: req.body.lastPurchase,
            itemGroup: req.body.itemGroup,
            stock: req.body.stock,
            sales: req.body.sales,
            code: req.body.code,
            name: req.body.name,
            productImage: req.files?.productImage?.[0]?.path || null,
            productBrochure: req.files?.productBrochure?.[0]?.path || null,
            pptAvailable: req.files?.pptAvailable?.[0]?.path || null,
            coveringLetter: req.files?.coveringLetter?.[0]?.path || null,
            isoCertificate: req.files?.isoCertificate?.[0]?.path || null,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.srNo = req.body.srNo || product.srNo;
            product.productName = req.body.productName || product.productName;
            product.model = req.body.model || product.model;
            product.productType = req.body.productType || product.productType;
            product.skuCode = req.body.skuCode || product.skuCode;
            product.amcCmc = req.body.amcCmc || product.amcCmc;
            product.companyName = req.body.companyName || product.companyName;
            product.availableModelNos = req.body.availableModelNos || product.availableModelNos;
            product.proposedCompany = req.body.proposedCompany || product.proposedCompany;
            product.hsnSacCode = req.body.hsnSacCode || product.hsnSacCode;
            product.warranty = req.body.warranty || product.warranty;
            product.expiryDate = req.body.expiryDate || product.expiryDate;
            product.amcValidityStartDate = req.body.amcValidityStartDate || product.amcValidityStartDate;
            product.amcValidityEndDate = req.body.amcValidityEndDate || product.amcValidityEndDate;
            product.productDescription = req.body.productDescription || product.productDescription;
            product.price = req.body.price || product.price;
            product.quantityUnit = req.body.quantityUnit || product.quantityUnit;
            product.lastPurchase = req.body.lastPurchase || product.lastPurchase;
            product.itemGroup = req.body.itemGroup || product.itemGroup;
            product.code = req.body.code || product.code;
            product.name = req.body.name || product.name;
            product.stock = req.body.stock || product.stock;
            product.sales = req.body.sales || product.sales;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Get top-selling products
const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ sales: -1 }).limit(5);
        res.json(products);
    } catch (error) {
        console.error("Error fetching top-selling products:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get emergency-required products (items with low stock)
const getEmergencyRequiredProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $lte: 3 } }).sort({ stock: 1 });
        res.json(products);
    } catch (error) {
        console.error("Error fetching emergency-required products:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    getTopSellingProducts,
    getEmergencyRequiredProducts,
};
