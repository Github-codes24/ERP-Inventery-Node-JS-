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
  },
  alternateNumber: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  alternateEmail: {
    type: String,
  },
  productOrService: {
    type: String,
  },
  category: {
    type: String,
  },
  productManufacture: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
  bankName: {
    type: String,
  },
  branchName: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  bankingName: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Vendor = mongoose.model("vendor", vendorSchema);
module.exports = Vendor;
