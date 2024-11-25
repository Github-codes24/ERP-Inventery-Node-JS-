const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendorId: {
    type: Number,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  alternateNumber: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  alternateEmail: {
    type: String,
    required: true,
  },
  productOrService: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productManufacture: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  bankingName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
