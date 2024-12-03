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
    // Clear existing products
    await ReplenishmentProduct.deleteMany({});
    console.log('Existing products cleared.');

    // Insert sample products
    await ReplenishmentProduct.insertMany(products);
    console.log('Sample products seeded successfully.');

  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Run the seeding script
seedProducts();

const getTopSellingProducts = async (req, res) => {
  try {
    const { productName } = req.query; // Extract filter criteria from query params

    // Fetch products from the database
    let products = await ReplenishmentProduct.find();

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

module.exports = { getTopSellingProducts };


// Get product by ID
const getReplenishmentProductById = async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from request parameters

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the product details
    return res.status(200).json({ product });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getTopSellingProducts, getReplenishmentProductById };
