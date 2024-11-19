const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    srNo: { type: String},
    productName: { type: String },
    model: { type: String },
    productType: { type: String },
    skuCode: { type: String },
    amcCmc: { type: String },
    companyName: { type: String },
    availableModelNos: { type: Number },
    proposedCompany: { type: String },
    hsnOrSacCode: { type: String },
    warranty: { type: String },
    expiryDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    productDescription: { type: String },
    quantity: { type: String },
    stock: { type: Number},
    productImage: { type: String },
    companyPrice:{ type: Number },
    gstRate: { type: Number }, 
    productBrochure: { type: String },
    pptAvailable: { type: String },
    coveringLetter: { type: String },
    isoCertificate: { type: String },
    applicableTaxes: Number, 
    date: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);
