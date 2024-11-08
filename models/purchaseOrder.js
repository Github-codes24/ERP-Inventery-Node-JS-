const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  poOrderNo: {
    type: String,
    required: true,
    unique: true
  },
  poDate: {
    type: Date,
    required: true
  },
clientName: { type: String, required: true },
address: { type: String, required: true },
cityStateZip: { type: String, required: true },
contact: { type: String, required: true },
customerName: { type: String, required: true },
address1: { type: String, required: true },
address2: { type: String },
cityStateZip: { type: String, required: true },
orderDetails: [
    {
      itemNo: { type: Number, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      taxableTotalValue: { type: Number, required: true },
      sgstRate: { type: Number, required: true },
      sgstAmount: { type: Number, required: true },
      total: { type: Number, required: true },
      itemCode: {type: String, required: true },
      description: {  type: String,  required: true },
      packaging: { type: String,default: 'Standard'}
    }
  ],
subTotal: { type: Number, required: true },
shippingHandling: { type: Number },
taxes: { type: Number },
netAmount: { type: Number, required: true },
expiryTerms: { type: String },
paymentTerms: { type: String },
deliveryTerms: { type: String },
returnPolicy: { type: String },
 name: { type: String, required: true },
designation: { type: String, required: true },
email: { type: String, required: true },
 contact: { type: String, required: true },
 supplier: { type: String, required: true },  
  destination: { type: String, required: true },  
  quantity: { type: Number, required: true },    
  received: { type: Number, required: true },   
  total: { type: Number, required: true },     
  orderedDate: { type: Date, required: true },  
  action: { type: String, required: true }  

});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
