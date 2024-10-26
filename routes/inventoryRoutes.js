const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
    createInventoryItem,
    getProductsByName,
    getProductById,
    getAvailableBrandNames
} = require('../controllers/inventoryController');

router.post('/', upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'brochure', maxCount: 1 },
    { name: 'ppt', maxCount: 1 },
    { name: 'coveringLetter', maxCount: 1 },
    { name: 'isoCertificate', maxCount: 1 }
]), createInventoryItem);


router.get('/brands', getAvailableBrandNames);
router.get('/search', getProductsByName);
router.get('/:id', getProductById);
router.post('/', createInventoryItem);
module.exports = router;
