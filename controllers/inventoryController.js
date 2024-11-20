const Product = require('../models/productModel');


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
module.exports = { getAvailableBrandNames };
