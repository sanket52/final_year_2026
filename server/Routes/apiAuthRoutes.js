const express = require('express');
const router = express.Router();
const auth = require('../Controller/authController');
const { authRequired, adminOnly } = require('../middleware/authMiddleware');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/profile', authRequired, auth.profile);
router.post('/logout', auth.logout);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);
router.get('/me/requests', authRequired, auth.meRequests);
router.get('/users', authRequired, adminOnly, auth.listUsers);

module.exports = router;
