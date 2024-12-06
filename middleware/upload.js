const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../db/cloudinary'); 

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

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads',
      // Uncomment below if you want to generate unique filenames
      // filename: function (req, file, cb) {
      //   cb(null, Date.now() + '-' + file.originalname)
      // }
    }
  });

  const upload = multer({ storage: storage });
const uploadImage = multer({ storage: imageStorage });
const uploadDocument = multer({ storage: documentStorage });



module.exports = { uploadImage, uploadDocument, upload };


// const { uploadDocument, uploadImage} = require('../middlewares/upload'); include anyone or both on basis of your need
//uploadDocument.single("document") // write like this where you want to use it