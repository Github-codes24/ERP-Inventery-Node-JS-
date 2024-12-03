const mongoose = require('mongoose');

const replenishmentProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  code: { type: String, required: true },
  itemSold: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  inStock: { type: Number, required: true },
  productImage: { type: String, required: true },
});

module.exports = mongoose.model('ReplenishmentProducts', replenishmentProductSchema);