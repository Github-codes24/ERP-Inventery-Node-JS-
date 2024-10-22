const Product = require('../models/productModel'); 
const asyncHandler = require('../middleware/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
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
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
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
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};
