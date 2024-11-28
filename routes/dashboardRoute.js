const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/totalOrder', dashboardController.totalOrder);
router.get('/getRecentOrders',dashboardController.getRecentOrders);
router.get('/getReplenishmentActions',dashboardController.getReplenishmentActions);
//router.get('/totalPendingOrder', dashboardController.totalPendingOrder);
router.get('/totalInventoryValue',dashboardController.totalInventoryValue);
router.get('/getReplenishmentActions',dashboardController.getReplenishmentActions);
router.get('/lowInventoryProduct',dashboardController.lowInventoryProduct);

module.exports = router;