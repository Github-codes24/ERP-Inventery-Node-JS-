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
      itemCode,
      description,
      packaging,
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
      itemCode,
      description,
      packaging,
      designation,
      email,
      contact
    });


    await newPurchaseOrder.save();

    
    return res.status(201).json({
      message: 'Purchase Order created successfully!',
      purchaseOrder: newPurchaseOrder
    });
  } catch (error) {
    
    return res.status(500).json({
      message: 'Error creating purchase order',
      error: error.message
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find(); 
    return res.status(200).json(orders); 
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};

const getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().select(
      'poOrderNo clientName address orderDetails poDate'
    );

    const formattedOrders = purchaseOrders.map(({ _id, poOrderNo, clientName, address, orderDetails, poDate }) => {
      const totalQuantity = orderDetails.reduce((sum, { quantity }) => sum + quantity, 0);
      const totalAmount = orderDetails.reduce((sum, { total }) => sum + total, 0);

      return {
        _id,
        poOrderNo,
        supplier: clientName, 
        destination: address, 
        quantity: totalQuantity,
        received: 0, 
        total: totalAmount,
        orderedDate: poDate,
        action: 'Pending' 
      };
    });

    return res.status(200).json({
      message: 'Purchase Orders fetched successfully!',
      purchaseOrders: formattedOrders
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching purchase orders',
      error: error.message
    });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

    return res.status(200).json(order); 
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching order', error });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  
      { new: true, runValidators: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

   return res.status(200).json(updatedOrder); e
  } catch (error) {
    return res.status(500).json({ message: 'Error updating order', error });
  }
};
const findOrdersByQueryParams = async (req, res) => {
  try {
    const filters = req.query; 
    const orders = await PurchaseOrder.find(filters);
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found matching the criteria' });
    }

   return  res.status(200).json(orders); 
  } catch (error) {
    return res.status(500).json({ message: 'Error finding orders', error });
  }
};

module.exports = {
  createPurchaseOrder,
  getAllOrders,
  getAllPurchaseOrders,
  getOrderById,
  updateOrderById,
  findOrdersByQueryParams,
};

