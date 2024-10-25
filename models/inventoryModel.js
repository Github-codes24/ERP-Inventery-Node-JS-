const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true, 
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', // This must match the model name in `productModel.js`
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    ratings: {
        type: Number,
        default: 0, 
        min: 0,
        max: 5, 
    },
    availableModelNos: {
        type: Number,
        required: true,
        min: 0, 
    },
    skuCode: {
        type: String,
        required: true,
        unique: true, 
    },
    description: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    technicalSpecification: {
        processor: String,
        graphics: String,
        memory: String,
        dimensions: String,
        materials: String,
    },
    documents: {
        brochure: String,
        ppt: String,
        coveringLetter: String,
        isoCertificate: String,
    },
    quantityInStock: {
        type: Number,
        required: true,
        min: 0, 
    },
    location: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
