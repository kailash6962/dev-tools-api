const express = require('express');
const router = express.Router();

const { Sample } = require('../controllers/sample');

const SampleController = new Sample();

router.post('/sample-post', SampleController.samplePOST);


module.exports = router;