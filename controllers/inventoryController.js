
const Inventory = require('../models/inventoryModel');

// Create a new inventory item
const createInventoryItem = async (req, res) => {
    try {
        const documents = {
            brochure: req.files.brochure ? req.files.brochure[0].path : null,
            ppt: req.files.ppt ? req.files.ppt[0].path : null,
            coveringLetter: req.files.coveringLetter ? req.files.coveringLetter[0].path : null,
            isoCertificate: req.files.isoCertificate ? req.files.isoCertificate[0].path : null,
        };

        const inventoryItem = new Inventory({
            ...req.body,
            documents,
        });

        await inventoryItem.save();
        res.status(201).send(inventoryItem);
    } catch (error) {
        console.error("Error creating inventory item:", error);
        res.status(400).send({ message: 'Error creating inventory item', error: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    console.log("Received request for product ID:", req.params.id);
    try {
        const inventoryItem = await Inventory.findById(req.params.id).populate('productId');
        
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Product not found' });
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

// Get available brand names
const getAvailableBrandNames = async (req, res) => {
    try {
        const brands = await Inventory.distinct('brandName');  
        res.json(brands);
    } catch (error) {
        console.error("Error fetching brand names:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {createInventoryItem, getProductsByName, getProductById,getAvailableBrandNames };
 