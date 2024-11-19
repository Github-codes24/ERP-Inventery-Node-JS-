const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    productName: {
        type: String,
        unique: true, 
        require: true,
    },
    Addedon: { type: Date },
    Action: { type: String },
    itemgroup: { type: String },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', 
        
    },

    brandName: {
        type: String,
        
    },
    price: {
        type: Number,
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
        min: 0, 
    },
    skuCode: {
        type: String,
        unique: true, 
    },
    description: {
        type: String,
    },
    productImage: {
        type: String,
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
        min: 0, 

    },

    location: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
