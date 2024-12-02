const express = require('express');
const router = express.Router();
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);
const { createPurchaseOrder,getAllPurchaseOrders,getOrderById, getTermsAndConditions,
    updateOrderById,findOrdersByQueryParams,getAllOrders,getNewSrNumber} = require('../controllers/purchaseOrderController');

router.post('/createPurchaseOrder', createPurchaseOrder);
router.get('/getAllPurchaseOrders', getAllPurchaseOrders);
router.get('/findOrdersByQueryParams', findOrdersByQueryParams);
router.get('/getOrderById/:id', getOrderById);
router.put('/updateOrder/:id', updateOrderById);
router.get('/getSrNoForPurchase', getNewSrNumber);
router.get('/getTermsAndConditions', getTermsAndConditions);



module.exports = router;
