const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); 
  }
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/; 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images or PDFs only!'), false); 
  }
};

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

module.exports = upload;
