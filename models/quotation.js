const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema({
  
  quotationNo: { type: String, required: true, unique: true },
  quotationName: { type: String },
  quotationDate: { type: Date, required: true },
  validity: { type: Date },

  from: {
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    cityStateZip: { type: String },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
  },

  
  to: {
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    cityStateZip: { type: String },
    email: { type: String },
    mobile: { type: String },
  },

  
  bankDetails: {
    bankName: { type: String, required: true },
    location: { type: String },
    accountName: { type: String, required: true },
    accountType: { type: String, required: true },
    ifscCode: { type: String, required: true },
  },

  
  items: [
    {
      itemNo: { type: Number, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      discountPercentage: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      sgstRate: { type: Number, default: 0 },
      sgstAmount: { type: Number, default: 0 },
      cgstRate: { type: Number, default: 0 },
      cgstAmount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
  ],

  termsAndConditions: {
    warranty: { type: String },
    orderSize: { type: String },
    paymentTerms: { type: String },
  },

  subtotal: { type: Number, required: true },
  totalDiscountPercentage: { type: Number, default: 0 },
  totalDiscountAmount: { type: Number, default: 0 },
  taxes: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Quotation", QuotationSchema);
