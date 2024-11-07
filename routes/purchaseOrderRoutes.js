const express = require('express');
const router = express.Router();
const { createPurchaseOrder,getAllOrders,getOrderById,updateOrderById,findOrdersByQueryParams} = require('../controllers/purchaseOrderController');

// Route to create a purchase order
router.post('/createPurchaseOrder', createPurchaseOrder);
router.get('/orders', getAllOrders);
router.get('/find', findOrdersByQueryParams);
router.get('/orders/:id', getOrderById);
router.put('/updateOrders/:id', updateOrderById);


module.exports = router;
