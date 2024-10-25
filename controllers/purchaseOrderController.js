const PurchaseOrder = require('../models/purchaseOrder');


const createPurchaseOrder = async (req, res) => {
  try {
    
    const {
      poOrderNo,
      poDate,
      clientName,
      address,
      cityStateZip,
      contact,
      customerName,
      address1,
      address2,
      orderDetails, 
      subTotal,
      shippingHandling,
      taxes,
      netAmount,
      expiryTerms,
      paymentTerms,
      deliveryTerms,
      returnPolicy,
      name,
      designation,
      email
    } = req.body;

    
    const newPurchaseOrder = new PurchaseOrder({
      poOrderNo,
      poDate,
      clientName,
      address,
      cityStateZip,
      contact,
      customerName,
      address1,
      address2,
      orderDetails,
      subTotal,
      shippingHandling,
      taxes,
      netAmount,
      expiryTerms,
      paymentTerms,
      deliveryTerms,
      returnPolicy,
      name,
      designation,
      email,
      contact
    });


    await newPurchaseOrder.save();

    
    res.status(201).json({
      message: 'Purchase Order created successfully!',
      purchaseOrder: newPurchaseOrder
    });
  } catch (error) {
    
    res.status(400).json({
      message: 'Error creating purchase order',
      error: error.message
    });
  }
};

module.exports = {
  createPurchaseOrder
};

