const express = require('express');
const router = express.Router();
const wareHouseController = require('../controllers/wareHouse.controller');

const companyMiddleware = require("../middleware/companyMiddleware");
router.use(companyMiddleware);

router.post('/createWarehouse', wareHouseController.createWarehouse);

router.get('/getAllWareHouses', wareHouseController.getAllWareHouses);

module.exports = router;