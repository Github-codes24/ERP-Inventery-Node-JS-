const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); 

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images_folder',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const documentStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      resource_type: 'raw', // Specify resource type as 'raw'
      folder: 'documents_folder',
      allowed_formats: ['pdf', 'doc', 'docx'],
    },
  });
  

const uploadImage = multer({ storage: imageStorage });
const uploadDocument = multer({ storage: documentStorage });

module.exports = { uploadImage, uploadDocument };


// const { uploadDocument, uploadImage} = require('../middlewares/upload'); include anyone or both on basis of your need
//uploadDocument.single("document") // write like this where you want to use it