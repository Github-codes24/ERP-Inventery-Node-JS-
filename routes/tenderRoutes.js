const express = require('express');
const multer = require('multer');
const { createTender, getTenders, getTenderById } = require('../controllers/tenderController'); // Check this import


const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify your upload directory

// Route to create a tender with file uploads
router.post('/', upload.fields([
    { name: 'tenderCopy', maxCount: 1 },
    { name: 'technicalDocuments', maxCount: 1 },
    { name: 'tenderFees', maxCount: 1 },
    { name: 'emdCopy', maxCount: 1 },
    { name: 'boq', maxCount: 1 },
    { name: 'pricing', maxCount: 1 },
    { name: 'performanceGuarantee', maxCount: 1 },
    { name: 'mou', maxCount: 1 },
    { name: 'otherDocuments', maxCount: 1 },
]), createTender);

// Route to get all tenders
router.get('/', getTenders); // Check if this function is defined

// Route to get a tender by ID
router.get('/:id', getTenderById); // Check if this function is defined

module.exports = router;
