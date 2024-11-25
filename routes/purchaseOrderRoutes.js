const express = require('express');
const router = express.Router();
const { createPurchaseOrder,getAllPurchaseOrders,getOrderById,updateOrderById,findOrdersByQueryParams,getAllOrders,getNewSrNumber} = require('../controllers/purchaseOrderController');

router.post('/createPurchaseOrder', createPurchaseOrder);
router.get('/getAllPurchaseOrders', getAllPurchaseOrders);
router.get('/findOrdersByQueryParams', findOrdersByQueryParams);
router.get('/getOrderById/:id', getOrderById);
router.put('/updateOrder/:id', updateOrderById);
router.get('/getNewSrNumber', getNewSrNumber);


module.exports = router;
