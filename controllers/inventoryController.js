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

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).select("productImage productName model companyPrice productDescription");

    if (!product) {
      return  res.status(404).json({ message: 'Product not found' });
    };

    return res.status(200).json({ success: true, product });
  } catch (error) {
     return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Make sure both functions are included in the exports
module.exports = { getAvailableBrandNames, getProductById };
