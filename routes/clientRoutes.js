const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Route for client registration

router.get('/getAllClients', clientController.getAllClients);
router.get('/findByQuery', clientController.findClient);
router.put('/updateClient/:id', clientController.updateClient);
router.get('/getByid/:id', clientController.getClientById);
router.post('/registerClient', upload.fields([
    { name: 'tertAuthFile', maxCount: 1 },
    { name: 'pptFile', maxCount: 1 },
    { name: 'coverLetterFile', maxCount: 1 },
    { name: 'productCertFile', maxCount: 1 },
    { name: 'isoCertFile', maxCount: 1 },
    { name: 'brochureFile', maxCount: 1 }
]), clientController.registerClient);
module.exports = router;
