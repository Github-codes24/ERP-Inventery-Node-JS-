const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema(
  {
    srNo: { type: String },
    dealerName: { type: String },
    manufacturerName: { type: String },
    productName: { type: String },
    productCode: { type: String },
    description: { type: String },
    hsnCode: { type: String },
    companyPrice: { type: Number },
    applicableGst: { type: Number },
    buyingPrice: { type: Number },
    sellingPrice: { type: Number },
    mouValidity: { type: String },
    teritaryAuthFile: { type: String },
    pptFile: { type: String },
    coverLetterFile: { type: String },
    productCertificate: { type: String },
    isoCertificate: { type: String },
    brochureFile: { type: String },
    technicalSpecification: { type: String },
    date: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Client", clientSchema);