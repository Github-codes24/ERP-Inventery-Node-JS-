const express = require('express');
const multer = require('multer');
const {
    createTender,
    getTenders,
    getTenderById,
    uploadDocument
} = require('../controllers/tenderController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 


router.get('/', getTenders); // Get all tenders
router.get('/:id', getTenderById); // Get a tender by ID
router.post('/', createTender); // Create a new tender
router.post('/:id/upload', upload.single('document'), uploadDocument); // Upload a document for a specific tender

module.exports = router;
