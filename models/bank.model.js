const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    },
    ifscCode: {
        type: String,
        required: true,
    },
    branchName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Bank", bankSchema);