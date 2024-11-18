const Product = require('../models/productModel');


// Get products by name
const getProducts = async (req, res) => {
  console.log("Received request to search for product:", req.query.productName);
  try {
      const {productName} = req.query;
      const products = await Product.find(req.query);
       return res.json(products); 
  } catch (error) {
      console.error("Error fetching products:", error);
     return  res.status(500).json({ message: 'Server Error', error: error.stack || error.message });
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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
   return  res.status(201).json(createdProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error: Product already exists', error: error.message });
    }

   return res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    
    const { id: productId } = req.params; 
    const product = await Product.findById(productId);

    if (!product) {
      console.log("Product not found:", productId);
      return res.status(404).json({ message: 'Product not found' });
    }

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
      name
    } = req.body;

    Object.assign(product, {
      srNo: srNo || product.srNo,
      productName: productName || product.productName,
      model: model || product.model,
      productType: productType || product.productType,
      skuCode: skuCode || product.skuCode,
      amcCmc: amcCmc || product.amcCmc,
      companyName: companyName || product.companyName,
      availableModelNos: availableModelNos || product.availableModelNos,
      proposedCompany: proposedCompany || product.proposedCompany,
      hsnSacCode: hsnSacCode || product.hsnSacCode,
      warranty: warranty || product.warranty,
      expiryDate: expiryDate || product.expiryDate,
      amcValidityStartDate: amcValidityStartDate || product.amcValidityStartDate,
      amcValidityEndDate: amcValidityEndDate || product.amcValidityEndDate,
      productDescription: productDescription || product.productDescription,
      price: price || product.price,
      quantityUnit: quantityUnit || product.quantityUnit,
      lastPurchase: lastPurchase || product.lastPurchase,
      itemGroup: itemGroup || product.itemGroup,
      code: code || product.code,
      name: name || product.name,
      productImage: req.files?.productImage?.[0]?.path || product.productImage,
      productBrochure: req.files?.productBrochure?.[0]?.path || product.productBrochure,
      pptAvailable: req.files?.pptAvailable?.[0]?.path || product.pptAvailable,
      coveringLetter: req.files?.coveringLetter?.[0]?.path || product.coveringLetter,
      isoCertificate: req.files?.isoCertificate?.[0]?.path || product.isoCertificate,
    });

    const updatedProduct = await product.save();
    console.log("Updated Product:", updatedProduct);
    return res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};



// Get top-selling products
const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ sales: -1 }).limit(5);
        return res.json(products);
    } catch (error) {
        console.error("Error fetching top-selling products:", error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

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

// Get Product Details for Dashboard
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
    getTopSellingProducts,
    getEmergencyRequiredProducts,
    getProductDetails,
};
