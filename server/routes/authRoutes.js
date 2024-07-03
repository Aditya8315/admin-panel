const express = require('express');
const { register, login, logout, verifyToken } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.get('/verify', verifyToken);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
