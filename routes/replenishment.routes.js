const express = require('express');
const router = express.Router();
const replenishmentController = require('../controllers/replenishmentController');
const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);

router.get('/getTopSellingProducts', replenishmentController.getTopSellingProducts);
router.get('/getReplenishmentProductById/:id', replenishmentController.getReplenishmentProductById);

module.exports = router;