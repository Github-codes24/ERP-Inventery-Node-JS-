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


// Update product by ID
const updateProduct = async (req, res) => {
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
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.srNo = srNo || product.srNo;
      product.productName = productName || product.productName;
      product.model = model || product.model;
      product.productType = productType || product.productType;
      product.skuCode = skuCode || product.skuCode;
      product.amcCmc = amcCmc || product.amcCmc;
      product.companyName = companyName || product.companyName;
      product.availableModelNos = availableModelNos || product.availableModelNos;
      product.proposedCompany = proposedCompany || product.proposedCompany;
      product.hsnSacCode = hsnSacCode || product.hsnSacCode;
      product.warranty = warranty || product.warranty;
      product.expiryDate = expiryDate || product.expiryDate;
      product.amcValidityStartDate = amcValidityStartDate || product.amcValidityStartDate;
      product.amcValidityEndDate = amcValidityEndDate || product.amcValidityEndDate;
      product.productDescription = productDescription || product.productDescription;
      product.price = price || product.price;
      product.quantityUnit = quantityUnit || product.quantityUnit;
      product.lastPurchase = lastPurchase || product.lastPurchase;
      product.itemGroup = itemGroup || product.itemGroup;
      product.code = code || product.code;
      product.name = name || product.name;

      product.productImage = req.files?.productImage?.[0]?.path || product.productImage;
      product.productBrochure = req.files?.productBrochure?.[0]?.path || product.productBrochure;
      product.pptAvailable = req.files?.pptAvailable?.[0]?.path || product.pptAvailable;
      product.coveringLetter = req.files?.coveringLetter?.[0]?.path || product.coveringLetter;
      product.isoCertificate = req.files?.isoCertificate?.[0]?.path || product.isoCertificate;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
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
