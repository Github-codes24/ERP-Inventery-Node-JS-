const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    warehouseID: {
        type: String,
        required: true,
        unique: true
    },
    warehouseName: {
        type: String,
        required: true
    },
    contactPerson1Name: {
        type: String,
        required: true
    },
    contactPerson2Name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    officialEmail: {
        type: String,
        required: true
    },
    alternateNumber: {
        type: String, required: true
    },
    personalEmail: {
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
            }]
    }, 
},
{timestamps : true});

module.exports = mongoose.model("Warehouse", warehouseSchema);
