const Product = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res) => {
    console.log("getAllProducts:", getAllProducts);
    try {
        const products = await Product.find(); 
        res.json(products); 
    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get available brand names
const getAvailableBrandNames = async (req, res) => {
    console.log("getAvailableBrandNames:", getAvailableBrandNames);
    try {
        const brands = await Product.distinct('companyName'); 
        res.json(brands); 
    } catch (error) {
        console.error("Error fetching brand names:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Make sure both functions are included in the exports
module.exports = { getAllProducts, getAvailableBrandNames };
