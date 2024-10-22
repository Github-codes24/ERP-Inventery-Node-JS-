const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Route for client registration
router.post('/register', clientController.registerClient);
router.get('/all', clientController.getAllClients);
router.get('/search', clientController.findClient);
router.put('/update/:id', clientController.updateClient);
router.get('/getbyid/:id', clientController.getClientById);
module.exports = router;
