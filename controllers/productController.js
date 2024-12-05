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
      const { productName, page = 1, limit = 10 } = req.query;

      // Parse page and limit as integers
      const currentPage = parseInt(page);
      const itemsPerPage = parseInt(limit);
  
      const skip = (currentPage - 1) * itemsPerPage;

      // Build the filter object
      const filter = {};
      if (productName) {
        filter.productName = productName;
      }
 
      // Get total count of matching documents
      const totalCount = await Product.countDocuments(filter);

      const products = await Product.find(filter).select("productName srNo productType date quantity companyPrice")
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      // Modify the data to add `lastPurchase`
      const modifiedData = products.map((product) => ({
        ...product._doc, // Spread the original document
        lastPurchase: "abcd", // Add the `lastPurchase` property
      }));
      return res.status(200).json({ success: true, products: modifiedData,
        pagination: {
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
          totalCount,
        },
      }); 
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
      amount,
      applicableTaxesAmount,
      date,
      warehouse,
      subTotal,
      freight,
      taxes,
      netAmount,
      approvedBy,
      dimensions,
      materials,
      performance,
      technicalSpecification
    } = req.body;

    // Validate required fields
    const error = {};
    if (!srNo) error.srNo = "Serial Number (srNo) is required.";
    if (!productName) error.productName = "Product Name is required.";
    if (!model) error.model = "Model is required.";
    if (!productType) error.productType = "Product Type is required.";
    if (!skuCode) error.skuCode = "SKU Code is required.";
    if (!companyName) error.companyName = "Company Name is required.";
    if (!availableModelNos) error.availableModelNos = "Available Model Numbers are required.";
    if (!proposedCompany) error.proposedCompany = "Proposed Company is required.";
    if (!hsnOrSacCode) error.hsnOrSacCode = "HSN or SAC Code is required.";
    if (!warranty) error.warranty = "Warranty is required.";
    if (!expiryDate) error.expiryDate = "Expiry Date is required.";
    if (!startDate) error.startDate = "Start Date is required.";
    if (!endDate) error.endDate = "End Date is required.";
    if (!productDescription) error.productDescription = "Product Description is required.";
    if (!quantity) error.quantity = "Quantity is required.";
    if (!companyPrice) error.companyPrice = "Company Price is required.";
    if (!gstRate) error.gstRate = "GST Rate is required.";
    if (!amount) error.amount = "Amount is required.";
    if (!applicableTaxesAmount) error.applicableTaxesAmount = "Applicable Taxes amount is required.";
    if (!date) error.date = "Date is required.";
    if (!warehouse) error.warehouse = "Warehouse is required."; 

    // Validate required files
    const requiredFiles = ['productImage', 'productBrochure', 'pptAvailable', 'coveringLetter', 'isoCertificate'];
    for (const file of requiredFiles) {
      if (!req.files?.[file]?.[0]?.path) {
        error[file] = `${file} is required`;
      }
    } 

    // If there are missing fields or files, return a detailed error message
    if (Object.keys(error).length > 0) {
      return res.status(400).json({
        message: "The following fields are missing or invalid:",
        error,
      });
    }

    // Extract file paths
    const productImage = req.files.productImage[0].path;
    const productBrochure = req.files.productBrochure[0].path;
    const pptAvailable = req.files.pptAvailable[0].path;
    const coveringLetter = req.files.coveringLetter[0].path;
    const isoCertificate = req.files.isoCertificate[0].path;

    // Convert date strings to Date objects
    expiryDate = new Date(expiryDate);
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    date = new Date(date);

    // Create the product
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
      amount,
      applicableTaxesAmount,
      date,
      warehouse, 
      productImage,
      productBrochure,
      pptAvailable,
      coveringLetter,
      isoCertificate,
      subTotal,
      freight,
      taxes,
      netAmount,
      approvedBy,
      dimensions,
      materials,
      performance,
      technicalSpecification
    });

    // Save the product
    const createdProduct = await product.save();
    return res.status(201).json({ success: true, createdProduct });

  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      message: "Error creating product.",
      error: error.message,
    });
  }
};



const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    // Extract form data from req.body
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
      applicableTaxesRate,
      applicableTaxesAmount,
      date,
      subTotal,
      warehouse,
      freight,
      taxes,
      netAmount,
      approvedBy,
      dimensions,
      materials,
      performance,
      technicalSpecification
    } = req.body;

    // Initialize file paths
    let productImage = req.files?.productImage
      ? req.files.productImage[0].path
      : null;
    let productBrochure = req.files?.productBrochure
      ? req.files.productBrochure[0].path
      : null;
    let pptAvailable = req.files?.pptAvailable
      ? req.files.pptAvailable[0].path
      : null;
    let coveringLetter = req.files?.coveringLetter
      ? req.files.coveringLetter[0].path
      : null;
    let isoCertificate = req.files?.isoCertificate
      ? req.files.isoCertificate[0].path
      : null;

    // Find the existing product to retain old file paths if no new file is uploaded
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the file paths only if the new files are uploaded, else retain old ones
    productImage = productImage || product.productImage;
    productBrochure = productBrochure || product.productBrochure;
    pptAvailable = pptAvailable || product.pptAvailable;
    coveringLetter = coveringLetter || product.coveringLetter;
    isoCertificate = isoCertificate || product.isoCertificate;

    // Prepare the update data object
    const updateData = {
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
      applicableTaxesRate,
      applicableTaxesAmount,
      date,
      warehouse, 
      productImage,
      productBrochure,
      pptAvailable,
      coveringLetter,
      isoCertificate,
      subTotal,
      freight,
      taxes,
      netAmount,
      approvedBy,
      dimensions,
      materials,
      performance,
      technicalSpecification
    };

    // Update the product data
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found after update" });
    }

    return res.status(200).json({ success: true, updatedProduct });

  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Error updating product",
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

      
      const totalItemGroups = await Product.distinct('productType');

      const totalItems = await Product.countDocuments({});

     return  res.status(200).json({
          outOfStock: outOfStockCount,
          totalItemGroups: totalItemGroups.length,
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



//get product types

const getProductTypes = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      
        "productTypes": [
          "Electronics",
          "Furniture",
          "Clothing",
          "Accessories",
          "Others"
        ]
      
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getTopSellingProducts = async (req, res) => {
  try {
    return res.json({products: [{productName:"Product 1", productImage:"https://res.cloudinary.com/dd8f3ggi2/image/upload/v1728321619/samples/breakfast.jpg"}, {productName:"Product 2", productImage:"https://res.cloudinary.com/dd8f3ggi2/image/upload/v1728321619/samples/breakfast.jpg"},{productName:"Product 2", productImage:"https://res.cloudinary.com/dd8f3ggi2/image/upload/v1728321619/samples/breakfast.jpg"}]});
  } catch (error) {
    console.error("Error fetching top-selling products:", error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

const getModelName = async (req, res) => {
  const models = [
    {
      modelName: "TUF Dash F15",
      modelNo: "FX516PM",
    },
    {
      modelName: "VivoBook 14",
      modelNo: "X415EA",
    },
    {
      modelName: "ROG Flow 13",
      modelNo: "X13GV",
    },
    {
      modelName: "MacBook Pro 14",
      modelNo: "A2442",
    }
  ];

  try {
    res.status(200).json({
      success: true,
      data: models,
    });
  } catch (error) {
    console.error("Error fetching model names:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching model names",
    });
  }
};

const getWarrantyPeriod = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      warrantyPeriods: [
        "1 Year",
        "2 Years",
        "3 Years",
        "4 Years",
        "5 Years",
        "6 Years"
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

const getProposedCompany = async (req, res) => {
  try {

    const proposedCompanies = [
      "ABC Electronics",
      "XYZ Industries",
      "PQR Retailers",
      "DEF Distributors",
      "GHI Manufacturing"
    ]
  
    return res.status(200).json({
      success: true,
      proposedCompanies: proposedCompanies,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAMCCMCList = async (req, res) => {
  try {

    const getAMCCMCList = [
      "HDFC Asset Management Company",
      "ICICI Prudential Asset Management",
      "SBI Mutual Fund",
      "Kotak Mahindra Asset Management",
      "Nippon India Mutual Fund"
    ];
    
  
    return res.status(200).json({
      success: true,
      AMCCMCList: getAMCCMCList,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllSerialNumbers = async (req, res) => {
  try {
    // Get all products from the database
    const products = await Product.find({}, 'srNo'); // Fetch only the srNo field

    // Extract the serial numbers
    const serialNumbers = products.map(product => product.srNo);

    // Return the serial numbers
    return res.status(200).json({
      success: true,
      data: serialNumbers
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get existing serial number

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    // getTopSellingProducts,
    getEmergencyRequiredProducts,
    getProductDetails,
    getStockNames,
    getNewSrNumber,
    getModelName,
    getProductTypes,
    getTopSellingProducts,
    getModelName,
    getWarrantyPeriod,
    getProposedCompany,
    getAMCCMCList,
    getAllSerialNumbers // Add the new function to module exports
};

