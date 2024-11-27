const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/totalOrder', dashboardController.totalOrder);
router.get('/getRecentOrders',dashboardController.getRecentOrders);
//router.get('/totalPendingOrder', dashboardController.totalPendingOrder);
router.get('/totalInventoryValue',dashboardController.totalInventoryValue);

module.exports = router;