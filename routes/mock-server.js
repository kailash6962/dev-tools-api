const express = require('express');
const router = express.Router();

const { 
    MockServer,
 } = require('../controllers/mock-server');

const MockServerController = new MockServer();
router.post('/sample-post', MockServerController.samplePOST);


module.exports = router;