const express = require('express');
const router = express.Router();

const { 
    Auth,
 } = require('../controllers/auth');

const AuthController = new Auth();
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/sendotp', AuthController.sendOtp);
router.post('/verifyotp', AuthController.verifyOtp);



module.exports = router;