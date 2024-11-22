import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fungsi untuk menentukan konfigurasi storage
const configureStorage = (folderName = 'document') =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', folderName));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// Fungsi untuk memeriksa tipe file
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|docx|doc|txt|xls|xlsx|ppt|pptx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only document files are allowed (pdf, docx, txt, xls, ppt, etc.)'));
  }
};

export const uploadSingle = multer({
  storage: configureStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: fileFilter,
}).single('fileUrl');  // Nama field untuk file adalah 'file'

