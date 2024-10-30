const Product = require('../models/productModel');


// Get products by name
const getProducts = async (req, res) => {
  console.log("Received request to search for product:", req.query.productName);
  try {
      const {productName} = req.query;
      const products = await Product.find(req.query);
      res.json(products); //returns empty array if product not found
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: 'Server Error', error: error.stack || error.message });
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  console.log("line 34");
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
      hsnSacCode,
      warranty,
      expiryDate,
      amcValidityStartDate,
      amcValidityEndDate,
      productDescription,
      price,
      quantityUnit,
      lastPurchase,
      itemGroup,
      code,
      name,
      gstRate,         
      companyPrice,   
      applicableTaxes, 
      freight         
    } = req.body;

    console.log(req.body, "line 59");

    // Calculate GST Amount based on gstRate and price
    const gstAmount = (price * (gstRate / 100)).toFixed(2);

    // Calculate Subtotal
    const subtotal = price * quantityUnit;

    // Calculate Total Taxes (sum of GST and applicable other taxes)
    const totalTaxes = parseFloat(gstAmount) + parseFloat(applicableTaxes);

    // Calculate Net Amount: Subtotal + Freight + Total Taxes
    const netAmount = (parseFloat(subtotal) + parseFloat(freight) + parseFloat(totalTaxes)).toFixed(2);

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
      hsnSacCode,
      warranty,
      expiryDate,
      amcValidityStartDate,
      amcValidityEndDate,
      productDescription,
      price,
      quantityUnit,
      lastPurchase,
      itemGroup,
      code,
      name,
      productImage,
      productBrochure,
      pptAvailable,
      coveringLetter,
      isoCertificate,
      gstRate,         
      gstAmount,       
      companyPrice,    
      applicableTaxes, 
      freight,         
      subtotal,        
      totalTaxes,      
      netAmount        
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error: Product already exists', error: error.message });
    }

    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    
    const productId = req.params.id; // Log the product ID
    const product = await Product.findById(productId);

    if (!product) {
      console.log("Product not found:", productId); 
      return res.status(404).json({ message: 'Product not found' });
    }

    product.srNo = req.body.srNo || product.srNo;
    product.productName = req.body.productName || product.productName;
    product.model = req.body.model || product.model;
    product.productType = req.body.productType || product.productType;
    product.skuCode = req.body.skuCode || product.skuCode;
    product.amcCmc = req.body.amcCmc || product.amcCmc;
    product.companyName = req.body.companyName || product.companyName;
    product.availableModelNos = req.body.availableModelNos || product.availableModelNos;
    product.proposedCompany = req.body.proposedCompany || product.proposedCompany;
    product.hsnSacCode = req.body.hsnSacCode || product.hsnSacCode;
    product.warranty = req.body.warranty || product.warranty;
    product.expiryDate = req.body.expiryDate || product.expiryDate;
    product.amcValidityStartDate = req.body.amcValidityStartDate || product.amcValidityStartDate;
    product.amcValidityEndDate = req.body.amcValidityEndDate || product.amcValidityEndDate;
    product.productDescription = req.body.productDescription || product.productDescription;
    product.price = req.body.price || product.price;
    product.quantityUnit = req.body.quantityUnit || product.quantityUnit;
    product.lastPurchase = req.body.lastPurchase || product.lastPurchase;
    product.itemGroup = req.body.itemGroup || product.itemGroup;
    product.code = req.body.code || product.code;
    product.name = req.body.name || product.name;

    product.productImage = req.files?.productImage?.[0]?.path || product.productImage;
    product.productBrochure = req.files?.productBrochure?.[0]?.path || product.productBrochure;
    product.pptAvailable = req.files?.pptAvailable?.[0]?.path || product.pptAvailable;
    product.coveringLetter = req.files?.coveringLetter?.[0]?.path || product.coveringLetter;
    product.isoCertificate = req.files?.isoCertificate?.[0]?.path || product.isoCertificate;

    const updatedProduct = await product.save();
    console.log("Updated Product:", updatedProduct); 
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error); 
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};


// Get top-selling products
const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ sales: -1 }).limit(5);
        res.json(products);
    } catch (error) {
        console.error("Error fetching top-selling products:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get emergency-required products (items with low stock)
const getEmergencyRequiredProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $lte: 3 } }).sort({ stock: 1 });
        res.json(products);
    } catch (error) {
        console.error("Error fetching emergency-required products:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// Get Product Details for Dashboard
const getProductDetails = async (req, res) => {
    try {
        // Get out of stock items count (assuming stock = 0 means out of stock)
        const outOfStockCount = await Product.countDocuments({ stock: 0 });

        // Get total item groups count (assuming 'itemGroup' is a distinct field)
        const totalItemGroups = await Product.distinct('itemGroup').length;

        // Get total item count
        const totalItems = await Product.countDocuments({});

        res.json({
            outOfStock: outOfStockCount,
            totalItemGroups: totalItemGroups,
            totalItems: totalItems
        });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    getTopSellingProducts,
    getEmergencyRequiredProducts,
    getProductDetails,
};
