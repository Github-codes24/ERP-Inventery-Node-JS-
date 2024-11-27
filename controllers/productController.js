const Product = require('../models/productModel');

const getNewSrNumber = async (req,res) => {
  try {
      const clients = await Product.find();
      const currentSrNo = clients.length + 1;
      return res.status(200).json({ success: true, srNo: currentSrNo });
  } catch (error) {
      console.error("Error getting new sr number:", error);
      return 1;
  }
}

// Get products by name
const getProducts = async (req, res) => {
  try {
      const {productName} = req.query;
      const products = await Product.find(req.query);
      return res.status(200).json({ success: true, products }); 
  } catch (error) {
     return  res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return  res.status(404).json({ message: 'Product not found' });
    };

    return res.status(200).json({ success: true, product });
  } catch (error) {
     return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    let {
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
     //check if data of expiryDate startDate endDate and date are in string if yes then parse it
    if(typeof expiryDate === 'string'){
      expiryDate = new Date(expiryDate);
    }
    if(typeof startDate === 'string'){
      startDate = new Date(startDate);
    }
    if(typeof endDate === 'string'){
      endDate = new Date(endDate);
    }
    if(typeof date === 'string'){
      date = new Date(date);
    }

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
    } = req.body;

    const product = await Product.findOne({ productName: productName });
    if (product) {
      return res.status(409).json({ message: 'Product with product name already exists' });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found after update' });
    }

    return res.status(200).json({ success: true, updatedProduct});

  } catch (error) {
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
//===#### Needs to be fixed #######====
// Get emergency-required products (items with low stock)   
const getEmergencyRequiredProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          quantity: { $lte:3 } 
        }
      },
      {
        $project: { 
          quantity: 1,
          productName: 1,
          _id: 1
        }
      },
      {
        $sort: { quantity: 1 } // Sort by quantity in ascending order
      }
    ]);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found with low quantity." });
    }
   
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products with specified quantity values:", error);
    return res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}

// Get Product Details Card for Product Management 
const getProductDetails = async (req, res) => {
  try {
      
      const outOfStockCount = await Product.countDocuments({ quantity: 0 });

      
      const totalItemGroups = await Product.distinct('itemGroup').length;

      const totalItems = await Product.countDocuments({});

     return  res.status(200).json({
          outOfStock: outOfStockCount,
          totalItemGroups: totalItemGroups,
          totalItems: totalItems
      });
  } catch (error) {
      console.error("Error fetching product details:", error);
     return  res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getStockNames = async (req, res) => {
  
  try {
    // Fetch only the productName field from all products
    const productnames = await Product.find().select('productName -_id');
    const products = productnames.map((product) => product.productName);
    return res.status(200).json({
      success: true,
      products // Returning the product names
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    // getTopSellingProducts,
    getEmergencyRequiredProducts,
    getProductDetails,
    getStockNames,
    getNewSrNumber
};