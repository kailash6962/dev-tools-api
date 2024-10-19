const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/jwtauth.js");

const { 
    Common,
 } = require('../controllers/common');

const CommonController = new Common();
router.post('/dashboard', auth, CommonController.dashboard);

module.exports = router;