const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    dealerName: {
        type: String,
        required: true
    },
    manufacturerName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    hsnCode: {
        type: String
    },
    companyPrice: {
        type: Number
    },
    applicableGst: {
        type: Number
    },
    buyingPrice: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    mouValidity: {
        type: String
    },
    // Save file paths in MongoDB
    tertAuthFile: {
        type: String
    },
    pptFile: {
        type: String
    },
    coverLetterFile: {
        type: String
    },
    productCertFile: {
        type: String
    },
    isoCertFile: {
        type: String
    },
    brochureFile: {
        type: String
    },
    technicalSpecification:{
       type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Client', clientSchema);
