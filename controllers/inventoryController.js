const Product = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res) => {
    console.log("getAllProducts:", getAllProducts);
    try {
        const products = await Product.find()
            .select("_id productName itemgroup quantityUnit Addedon price hsnSacCode Action");

        return res.json(products); 
    } catch (error) {
        console.error("Error fetching all products:", error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Get available brand names
const getAvailableBrandNames = async (req, res) => {
    console.log("getAvailableBrandNames:", getAvailableBrandNames);
    try {
        const brands = await Product.distinct('companyName'); 
       return res.json(brands); 
    } catch (error) {
        console.error("Error fetching brand names:", error);
       return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Make sure both functions are included in the exports
module.exports = { getAllProducts, getAvailableBrandNames };
