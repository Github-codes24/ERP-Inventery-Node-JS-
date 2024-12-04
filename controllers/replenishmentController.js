const ReplenishmentProduct = require('../models/replenishmentProducts.model');


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

// Seed the products into the database
const seedProducts = async () => {
  try {

    // Insert sample products
    await ReplenishmentProduct.insertMany(products);
    console.log('Sample products seeded successfully.');

  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Run the seeding script
// seedProducts();

const getTopSellingProducts = async (req, res) => {
  try {
    const { productName } = req.query; // Extract filter criteria from query params

    // Fetch products from the database
    let products = await ReplenishmentProduct.find().limit(5).sort({ createdAt: -1 });

    // Add calculated fields: totalValue and status
    const enrichedProducts = products.map((product) => ({
      ...product.toObject(), // Convert Mongoose document to plain JS object
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


// Get product by ID
const getReplenishmentProductById = async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from request parameters

    // Find the product by ID
    const product = await ReplenishmentProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add calculated fields: totalValue and status
    const enrichedProduct = {
      ...product.toObject(), // Convert Mongoose document to plain JS object
      status: product.inStock > 0 ? "In Stock" : "Out of Stock", // Determine status
    };

    // Return the product details with additional fields
    return res.status(200).json({ product: enrichedProduct });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const AddNewReplenishment = async (req, res) => { 
  try {
    const { productId, product, quantity, amount } = req.body;

   
    const error = {};
    if (!productId) error.productId = "Product ID is required.";
    if (!product) error.product = "Product name is required.";
    if (!quantity) error.quantity = "Quantity is required.";
    if (!amount) error.amount = "Amount is required.";

    
    if (Object.keys(error).length > 0) {
      return res.status(400).json({
        message: "The following fields are missing or invalid:",
        error,
      });
    }

    
    const newProduct = new ReplenishmentProduct({
      productName: product, 
      code: productId,      
      unitPrice: amount,   
      inStock: quantity,    
    });

    // Save to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    return res.status(201).json({
      success: true,
      message: 'New replenishment product added successfully',
      product: savedProduct,
    });
  } catch (error) {
    // Log and handle errors
    console.error('Error adding new replenishment:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { getTopSellingProducts, getReplenishmentProductById, AddNewReplenishment  };
