const Product = require('../models/productModel');  
const Inventory = require('../models/inventoryModel');

// Get product by ID
const getProductById = async (req, res) => {
    console.log("Received request for product ID:", req.params.id);
    try {
        const inventoryItem = await Inventory.findOne({ productId: req.params.id }).populate('productId');
        if (!inventoryItem) {
            return res.status(400).json({ message: 'Product not found' });
        }
        res.json(inventoryItem);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get products by name
const getProductsByName = async (req, res) => {

 console.log("Searching for product by name:", req.query.productName);
    try {
        const { productName } = req.query;
        if (!productName) {
            return res.status(400).json({ message: 'Product name is required' });
        }

         const inventories = await Inventory.find({ productName: { $regex: new RegExp(productName, 'i') } }).populate('productId');
        if (inventories.length === 0) {
            return res.status(404).json({ message: 'No products found with that name' });
        }
        res.json(inventories);
    } catch (error) {
        console.error("Error fetching products by name:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getProductsByName, getProductById };
