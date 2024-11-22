const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  poOrderNo: { type: String, required: true, unique: true },
  poDate: { type: Date, required: true },
  shipAndBillToAddress: {
    clientName: { type: String, required: true },
    address: { type: String, required: true },
    cityStateZip: { type: String, required: true },
    contact: { type: String, required: true },
  },
  purchaseForm: {
    vendorName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, default: "" },
    cityStateZip: { type: String, required: true },
  },
  orderDetails: [
    {
      itemNo: { type: Number, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      taxableTotalValue: { type: Number, required: true },
      sgstRate: { type: Number, required: true },
      sgstAmount: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  subTotal: { type: Number, required: true },
  shippingHandling: { type: Number, default: 0 },
  taxes: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  expiryTerms: { type: String, default: "" },
  paymentTerms: { type: String, default: "" },
  deliveryTerms: { type: String, default: "" },
  returnPolicy: { type: String, default: ""},
  name: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
}, 
{ timestamps: true }
);

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
