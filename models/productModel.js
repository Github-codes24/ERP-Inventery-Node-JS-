const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    srNo: { type: String, required: true },
    productName: { type: String, required: true },
    model: { type: String, required: true },
    productType: { type: String, required: true },
    skuCode: { type: String, required: true },
    warehouse: { type: String, required: true },
    amcCmc: { type: String, required: true },
    companyName: { type: String, required: true },
    availableModelNos: { type: Number, required: true },
    proposedCompany: { type: String, required: true },
    hsnOrSacCode: { type: String, required: true },
    warranty: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    productDescription: { type: String, required: true },
    quantity: { type: String, required: true },
    stock: { type: Number, default: 0, required: true },
    productImage: { type: String, required: true },
    companyPrice: { type: Number, required: true },
    gstRate: { type: Number, required: true },
    productBrochure: { type: String, required: true },
    pptAvailable: { type: String, required: true },
    coveringLetter: { type: String, required: true },
    isoCertificate: { type: String, required: true },
    applicableTaxes: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
