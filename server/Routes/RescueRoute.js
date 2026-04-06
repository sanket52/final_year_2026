const express = require('express');
const multer = require('multer');
const path = require('path');
const { submitRescue } = require('../Controller/RescueController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../rescue-uploads'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `rescue-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\//.test(file.mimetype);
    if (ok) cb(null, true);
    else cb(new Error('Only image uploads are allowed'));
  }
});

const router = express.Router();

router.post('/report', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    next();
  });
}, submitRescue);

module.exports = router;
