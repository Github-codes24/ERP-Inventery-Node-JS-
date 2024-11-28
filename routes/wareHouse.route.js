const express = require('express');
const router = express.Router();
const wareHouseController = require('../controllers/wareHouse.controller');


router.get('/getAllWareHouses', wareHouseController.getAllWareHouses);

module.exports = router;