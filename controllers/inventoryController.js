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

    // Get main product
    const mainProduct = await Product.findById(id)
      .select("productImage productName model companyPrice productDescription");

    if (!mainProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find similar products with same name but different brands
    const similarProducts = await Product.find({
      productName: mainProduct.productName,
      companyName: { $ne: mainProduct.companyName },
    }).select("companyName companyPrice -_id");

    // Format the response
    const response = {
      success: true,
      product: {
        ...mainProduct.toObject(),
        sameProductInOtherBrands: similarProducts.map(product => ({
          brandName: product.companyName,
          price: product.companyPrice,
          ratings: 0 
        }))
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// Make sure both functions are included in the exports
module.exports = { getAvailableBrandNames, getProductById };
