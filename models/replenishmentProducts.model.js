const mongoose = require('mongoose');

const replenishmentProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  code: { type: String, required: true },
  itemSold: { type: Number },
  unitPrice: { type: Number, required: true },
  inStock: { type: Number},//quantity
  productImage: { type: String },
});

module.exports = mongoose.model('ReplenishmentProducts', replenishmentProductSchema);