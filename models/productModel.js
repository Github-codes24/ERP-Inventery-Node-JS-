const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    srNo: { type: String, required: true },
    productName: { type: String, required: true ,unique: true, },
    model: { type: String, required: true },
    productType: { type: String, required: true },
    skuCode: { type: String, required: true },
    amcCmc: { type: String, required: true },
    companyName: { type: String, required: true },
    availableModelNos: { type: Number },
    proposedCompany: { type: String },
    hsnSacCode: { type: String },
    warranty: { type: String },
    expiryDate: { type: Date },
    amcValidityStartDate: { type: Date },
    amcValidityEndDate: { type: Date },
    productDescription: { type: String },
    price: { type: Number},
    quantityUnit: { type: String },
    lastPurchase: { type: Date },
    stock: { type: Number},
    sales: { type: Number, default: 0 },
    itemGroup: { type: String },
    productImage: { type: String },
    productBrochure: { type: String },
    pptAvailable: { type: String },
    coveringLetter: { type: String },
    isoCertificate: { type: String },
    gstRate: Number, 
    gstAmount: Number, 
    companyPrice: Number, 
    applicableTaxes: Number, 
    freight: Number, 
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);
