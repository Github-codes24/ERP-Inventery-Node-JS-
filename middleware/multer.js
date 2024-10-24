const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Uploads folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // Max file size 10MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([
    { name: 'tertAuthFile', maxCount: 1 },
    { name: 'pptFile', maxCount: 1 },
    { name: 'coverLetterFile', maxCount: 1 },
    { name: 'productCertFile', maxCount: 1 },
    { name: 'isoCertFile', maxCount: 1 },
    { name: 'brochureFile', maxCount: 1 }
]);

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: File type not supported!');
    }
}

module.exports = upload;
