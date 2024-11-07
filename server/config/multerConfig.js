const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'storage/app/public/';
    
    if (file.mimetype.startsWith('image/')) {
      uploadPath += 'images/profile/';
    } else if (file.mimetype === 'application/pdf') {
      uploadPath += 'pdfs/resume/';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;