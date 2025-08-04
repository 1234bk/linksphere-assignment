const express = require('express');
const router = express.Router();
const {authenticateToken } = require('../middleware/authenticateToken');
const { register, login,updateprofile , } = require('../controllers/authcontroller');
console.log("✅ authRoutes loaded"); 

router.post('/register', register);
router.post('/login', login);
router.put('/updateprofile', authenticateToken, updateprofile);
// Protected admin route




module.exports = router;
