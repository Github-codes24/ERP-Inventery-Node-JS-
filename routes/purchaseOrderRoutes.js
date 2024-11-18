const express = require('express');
const router = express.Router();
const { createPurchaseOrder,getAllPurchaseOrders,getOrderById,updateOrderById,findOrdersByQueryParams,getAllOrders} = require('../controllers/purchaseOrderController');

router.post('/createPurchaseOrder', createPurchaseOrder);
router.get('/orders', getAllPurchaseOrders);
router.get('/all-orders', getAllOrders);
router.get('/find', findOrdersByQueryParams);
router.get('/orders/:id', getOrderById);
router.put('/updateOrders/:id', updateOrderById);


module.exports = router;
