const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/totalOrder', dashboardController.totalOrder);
//router.get('/totalPendingOrder', dashboardController.totalPendingOrder);
router.get('/totalInventoryValue',dashboardController.totalInventoryValue);
router.get('/lowInventoryProduct',dashboardController.lowInventoryProduct);

module.exports = router;