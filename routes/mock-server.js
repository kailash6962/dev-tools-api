const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/jwtauth.js");
const { 
    MockServer,
    MockServerRequests,
    MockAPICall,
 } = require('../controllers/mock-server');

const MockServerController = new MockServer();
router.post('/mockserver-create',auth,  MockServerController.create);
router.post('/mockserver-read',auth,  MockServerController.read);
router.post('/mockserver-update',auth,  MockServerController.update);
router.post('/mockserver-delete',auth, MockServerController.delete);

const MockServerRequestsController = new MockServerRequests();
router.post('/mockserverrequest-create',auth,  MockServerRequestsController.create);
router.post('/mockserverrequest-read',auth,  MockServerRequestsController.read);
router.post('/mockserverrequest-update',auth,  MockServerRequestsController.update);
router.post('/mockserverrequest-delete',auth, MockServerRequestsController.delete);

const MockAPICallController = new MockAPICall();
router.get('/mockserver/:server_code/:slug',MockAPICallController.mockrequestCall);
router.post('/mockserver/:server_code/:slug',MockAPICallController.mockrequestCall);

module.exports = router;