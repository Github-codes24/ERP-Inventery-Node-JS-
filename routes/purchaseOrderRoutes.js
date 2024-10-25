const express = require('express');
const router = express.Router();
const { createPurchaseOrder } = require('../controllers/purchaseOrderController');

// Route to create a purchase order
router.post('/createPurchaseOrder', createPurchaseOrder);

module.exports = router;
