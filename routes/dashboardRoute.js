const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const companyMiddleware = require("../middleware/companyMiddleware");
//router.use(companyMiddleware);
router.get('/totalOrder',dashboardController.totalOrder);
router.get('/getRecentOrders',dashboardController.getRecentOrders);
//router.get('/totalPendingOrder', dashboardController.totalPendingOrder);
router.get('/totalInventoryValue',dashboardController.totalInventoryValue);
router.get('/getReplenishmentActions',dashboardController.getReplenishmentActions);
router.get('/lowInventoryProduct',dashboardController.lowInventoryProduct);
router.get('/getInventoryLevel',dashboardController.getInventoryLevel);

module.exports = router;