const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/jwtauth.js");
const { 
    MockServer,
 } = require('../controllers/mock-server');

const MockServerController = new MockServer();
router.post('/mockserver-create',auth,  MockServerController.create);
router.post('/mockserver-read',auth,  MockServerController.read);
router.post('/mockserver-update',auth,  MockServerController.update);
router.post('/mockserver-delete',auth, MockServerController.delete);

module.exports = router;