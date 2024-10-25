const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const productSchema = new mongoose.Schema({
    srNo: { type: Number, required: true },
    productName: { type: String, required: true },
    model: { type: String, required: true },
    productType: { type: String, required: true },
    skuCode: { type: String, required: true },
    amcCmc: { type: String, required: true },
    companyName: { type: String, required: true },
    availableModelNos: { type: String, required: true },
    proposedCompany: { type: String, required: true },
    hsnSacCode: { type: String, required: true },
    warranty: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    amcValidityStartDate: { type: Date, required: true },
    amcValidityEndDate: { type: Date, required: true },
    productDescription: { type: String, required: true },
    price: { type: Number, required: true },
    quantityUnit: { type: String, required: true },
    lastPurchase: { type: Date, required: true },
    itemGroup: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    productImage: { type: String }, 
    productBrochure: { type: String }, 
    pptAvailable: { type: String }, 
    coveringLetter: { type: String }, 
    isoCertificate: { type: String }, 
    productImageUploadDate: { type: Date },
    productBrochureUploadDate: { type: Date },
    pptAvailableUploadDate: { type: Date },
    coveringLetterUploadDate: { type: Date },
    isoCertificateUploadDate: { type: Date }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
