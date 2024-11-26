const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    srNo: { type: String, required: true },
    dealerName: { type: String, required: true },
    manufacturerName: { type: String, required: true },
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    description: { type: String, required: true },
    hsnCode: { type: String, required: true },
    companyPrice: { type: Number, required: true },
    applicableGst: { type: Number, required: true },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    mouValidity: { type: String, required: true },
    teritaryAuthFile: { type: String, required: true },
    pptFile: { type: String, required: true },
    coverLetterFile: { type: String, required: true },
    productCertificate: { type: String, required: true },
    isoCertificate: { type: String, required: true },
    brochureFile: { type: String, required: true },
    technicalSpecification: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
