const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

router.get('/salesByCompany', reportController.salesByCompany);
router.get('/salesByProduct', reportController.salesByProduct);
router.get('/salesByRegion', reportController.salesByRegion);
router.get('/saleBySalesPerson', reportController.saleBySalesPerson);
router.get('/getAllReports', reportController.getAllReports);
module.exports = router;