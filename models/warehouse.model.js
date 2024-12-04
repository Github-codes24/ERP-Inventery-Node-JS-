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
        unique: true,
        required: true
    },
    officialEmail: {
        type: String,
        unique: true,
        required: true
    },
    alternateNumber: {
        type: String, required: true
    },
    personalEmail: {
        type: String, required: true
    },
    location: {
        type: String,
        required: true
    },
    postalAddress: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    storedMaterials: [
        {
            storedMaterialName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
},
{timestamps : true});

module.exports = mongoose.model("Warehouse", warehouseSchema);
