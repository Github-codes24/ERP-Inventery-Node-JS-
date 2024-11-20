const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema({
  quotationNo: { type: String, unique: true },
  quotationName: { type: String },
  quotationDate: { type: Date },
  validity: { type: Date },

  from: {
    companyName: { type: String },
    address: { type: String },
    cityStateZip: { type: String },
    email: { type: String },
    mobile: { type: String },
  },

  to: {
    customerName: { type: String },
    address: { type: String },
    cityStateZip: { type: String },
    email: { type: String },
    mobile: { type: String },
  },

  bankDetails: {
    bankName: { type: String },
    location: { type: String },
    accountName: { type: String },
    accountType: { type: String },
    ifscCode: { type: String },
  },

  items: [
    {
      itemNo: { type: Number },
    //  description: { type: String }, // this field is not available in figma
      quantity: { type: Number },
      unitPrice: { type: Number },
      discountPercentage: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      sgstRate: { type: Number, default: 0 },
      sgstAmount: { type: Number, default: 0 },
      cgstRate: { type: Number, default: 0 },
      cgstAmount: { type: Number, default: 0 },
      total: { type: Number },
    },
  ],

  termsAndConditions: {
    warranty: { type: String },
    orderSize: { type: String },
    paymentTerms: { type: String },
  },

  subtotal: { type: Number },
  totalDiscountPercentage: { type: Number, default: 0 },
  totalDiscountAmount: { type: Number, default: 0 },
  taxes: { type: Number, default: 0 },
  netAmount: { type: Number },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Quotation", QuotationSchema);