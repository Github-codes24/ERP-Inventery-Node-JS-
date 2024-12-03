const Product = require('../models/productModel');

const getTopSellingProducts = async (req, res) => {
  try {
    const { productName } = req.query; // Extract filter criteria from query params

    // Sample products data
    const products = [
      {
        productName: "Product 1",
        code: "P001",
        itemSold: 120,
        unitPrice: 10.5,
        inStock: 50,
        productImage: "https://res.cloudinary.com/dd8f3ggi2/image/upload/v1728321619/samples/breakfast.jpg",
      },
      {
        productName: "Product 2",
        code: "P002",
        itemSold: 85,
        unitPrice: 15.0,
        inStock: 30,
        productImage: "https://res.cloudinary.com/dd8f3ggi2/image/upload/v1728321619/samples/breakfast.jpg",
      },
      {
        productName: "Product 3",
        code: "P003",
        itemSold: 60,
        unitPrice: 8.75,
        inStock: 20,
        productImage: "https://res.cloudinary.com/dd8f3ggi2/image/upload/v1728321619/samples/breakfast.jpg",
      },
    ];

    // Add calculated fields: totalValue and status
    const enrichedProducts = products.map((product) => ({
      ...product,
      totalValue: product.unitPrice * product.inStock, // Calculate total value
      status: product.inStock > 0 ? "In Stock" : "Out of Stock", // Determine status
    }));

    // Apply filter based on productName if provided
    const filteredProducts = productName
      ? enrichedProducts.filter((product) =>
          product.productName.toLowerCase().includes(productName.toLowerCase())
        )
      : enrichedProducts;

    // Return the filtered products
    return res.status(200).json({ products: filteredProducts });
  } catch (error) {
    console.error("Error fetching top-selling products:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getTopSellingProducts };
