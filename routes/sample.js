const express = require('express');
const router = express.Router();

const { 
    Sample,
    MySqlCRUD,
 } = require('../controllers/sample');

const SampleController = new Sample();
router.post('/sample-post', SampleController.samplePOST);

const MySqlCRUDController = new MySqlCRUD();
router.post('/mysql-create', MySqlCRUDController.create);
router.post('/mysql-read', MySqlCRUDController.read);
router.post('/mysql-update', MySqlCRUDController.update);
router.post('/mysql-delete', MySqlCRUDController.delete);


module.exports = router;