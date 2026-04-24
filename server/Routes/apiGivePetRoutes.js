const express = require('express');
const multer = require('multer');
const path = require('path');
const { createGivePet, listAll, updateStatus } = require('../Controller/givePetApiController');
const { authRequired, adminOnly } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../give-pet-uploads'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `gp-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Images only'));
  }
});

const router = express.Router();

router.post('/', authRequired, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'Upload failed' });
    next();
  });
}, createGivePet);

router.get('/all', authRequired, adminOnly, listAll);
router.patch('/:id/status', authRequired, adminOnly, updateStatus);

module.exports = router;
