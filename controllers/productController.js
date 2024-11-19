const Product = require('../models/productModel');


// Get products by name
const getProducts = async (req, res) => {
  try {
      const {productName} = req.query;
      const products = await Product.find(req.query);
       return res.status(200).json({products, success: true}); 
  } catch (error) {
      console.error("Error fetching products:", error);
     return  res.status(500).json({ message: 'Server Error', error: error.stack || error.message });
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
     return res.json(product);
    } else {
      return  res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
     return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      srNo,
      productName,
      model,
      productType,
      skuCode,
      amcCmc,
      companyName,
      availableModelNos,
      proposedCompany,
      hsnOrSacCode,
      warranty,
      expiryDate,
      startDate,
      endDate,
      productDescription,
      quantity,
      companyPrice,
      gstRate, 
      applicableTaxes, 
      date,
      stock = 0          
    } = req.body;


    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with the same name already exists' });
    }

    const productImage = req.files?.productImage?.[0]?.path || null;
    const productBrochure = req.files?.productBrochure?.[0]?.path || null;
    const pptAvailable = req.files?.pptAvailable?.[0]?.path || null;
    const coveringLetter = req.files?.coveringLetter?.[0]?.path || null;
    const isoCertificate = req.files?.isoCertificate?.[0]?.path || null;

    const product = new Product({
      srNo,
      productName,
      model,
      productType,
      skuCode,
      amcCmc,
      companyName,
      availableModelNos,
      proposedCompany,
      hsnOrSacCode,
      warranty,
      expiryDate,
      startDate,
      endDate,
      productDescription,
      quantity,
      companyPrice,
      gstRate, 
      applicableTaxes, 
      date,
      stock,
      productImage,
      productBrochure,
      pptAvailable,
      coveringLetter,
      isoCertificate
    });

    const createdProduct = await product.save();
   return  res.status(201).json({ success: true ,createdProduct});
  } catch (error) {
   return res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    // Validate product ID
    if (!productId?.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create updates object from request body
    const allowedFields = [
      'srNo', 'productName', 'model', 'productType', 'skuCode',
      'amcCmc', 'companyName', 'availableModelNos', 'proposedCompany',
      'hsnSacCode', 'warranty', 'expiryDate', 'startDate', 'endDate',
      'productDescription', 'quantity', 'companyPrice', 'gstRate',
      'applicableTaxes', 'date', 'stock'
    ];

    const updates = Object.fromEntries(
      Object.entries(req.body)
        .filter(([key]) => allowedFields.includes(key))
    );

    // Convert numeric fields
    const numericFields = ['companyPrice', 'gstRate', 'applicableTaxes', 'stock', 'availableModelNos'];
    numericFields.forEach(field => {
      if (updates[field]) {
        updates[field] = Number(updates[field]);
      }
    });

    // Process file uploads if any
    const fileFields = ['productImage', 'productBrochure', 'pptAvailable', 'coveringLetter', 'isoCertificate'];
    fileFields.forEach(field => {
      if (req.files?.[field]?.[0]?.path) {
        updates[field] = req.files[field][0].path.replace(/\\/g, '/');
      }
    });

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found after update' });
    }

    return res.json(updatedProduct);

  } catch (error) {
    console.error("Error updating product:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid data format'
      });
    }

    return res.status(500).json({ 
      message: 'Error updating product',
      error: error.message 
    });
  }
};



// // Get top-selling products
// const getTopSellingProducts = async (req, res) => {
//     try {
//         const products = await Product.find().sort({ sales: -1 }).limit(5);
//         return res.json(products);
//     } catch (error) {
//         console.error("Error fetching top-selling products:", error);
//         return res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// Get emergency-required products (items with low stock)
const getEmergencyRequiredProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $lte: 3 } }).sort({ stock: 1 });
       return  res.json(products);
    } catch (error) {
        console.error("Error fetching emergency-required products:", error);
       return  res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// Get Product Details Card for Product Management 
const getProductDetails = async (req, res) => {
    try {
        // Get out of stock items count (assuming stock = 0 means out of stock)
        const outOfStockCount = await Product.countDocuments({ stock: 0 });

        // Get total item groups count (assuming 'itemGroup' is a distinct field)
        const totalItemGroups = await Product.distinct('itemGroup').length;

        // Get total item count
        const totalItems = await Product.countDocuments({});

       return  res.json({
            outOfStock: outOfStockCount,
            totalItemGroups: totalItemGroups,
            totalItems: totalItems
        });
    } catch (error) {
        console.error("Error fetching product details:", error);
       return  res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    // getTopSellingProducts,
    getEmergencyRequiredProducts,
    getProductDetails
};
