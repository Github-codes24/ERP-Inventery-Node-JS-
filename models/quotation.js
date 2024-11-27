const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema(
  {
    quotationNo: { type: String, unique: true, required: true },
    quotationName: { type: String, required: true },
    quotationDate: { type: Date, required: true },
    validity: { type: Date, required: true },

    from: {
      companyName: { type: String, required: true },
      companyAddress: { type: String, required: true },
      companyCountry: { type: String, required: true },
      companyState: { type: String, required: true },
      companyCity: { type: String, required: true },
      companyZipcode: { type: String, required: true },
      companyEmail: { type: String, required: true },
      companyMobile: { type: String, required: true },
    },

    to: {
      customerName: { type: String, required: true },
      customerAddress: { type: String, required: true },
      customerCountry: { type: String, required: true },
      customerState: { type: String, required: true },
      customerCity: { type: String, required: true },
      customerZipcode: { type: String, required: true },
      customerEmail: { type: String, required: true },
      customerMobile: { type: String, required: true },
    },

    bankDetails: [{
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      accountType: { type: String, required: true },
      ifscCode: { type: String, required: true },
      branchName: { type: String, required: true },
      address: { type: String, required: true },
    }],

    items: [
      {
        itemNo: { type: Number, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        discountPercentage: { type: Number, default: 0, required: true },
        discountAmount: { type: Number, default: 0, required: true },
        sgstRate: { type: Number, default: 0, required: true },
        sgstAmount: { type: Number, default: 0, required: true },
        cgstRate: { type: Number, default: 0, required: true },
        cgstAmount: { type: Number, default: 0, required: true },
        total: { type: Number, required: true },
      },
    ],

    termsAndConditions: {
      warranty: { type: String, required: true },
      orderSize: { type: String, required: true },
      paymentTerms: { type: String, required: true },
    },

    subtotal: { type: Number, required: true },
    totalDiscountPercentage: { type: Number, default: 0, required: true },
    totalDiscountAmount: { type: Number, default: 0, required: true },
    taxes: { type: Number, default: 0, required: true },
    netAmount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true } // Correctly placed timestamps option here
);

module.exports = mongoose.model("Quotation", QuotationSchema);
