const express = require('express');
const router = express.Router();
const { createPurchaseOrder,getAllOrders,getOrderById,updateOrderById,findOrdersByParams} = require('../controllers/purchaseOrderController');

// Route to create a purchase order
router.post('/createPurchaseOrder', createPurchaseOrder);
router.get('/orders', getAllOrders);
router.get('/find', findOrdersByParams);
router.get('/orders/:id', getOrderById);
router.put('/updateOrders/:id', updateOrderById);
module.exports = router;
