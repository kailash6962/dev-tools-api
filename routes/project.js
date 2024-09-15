const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/jwtauth.js");
const { 
    Project,
 } = require('../controllers/project.js');

const ProjectsController = new Project();
router.post('/project-create',auth,  ProjectsController.create);
router.post('/project-read',auth,  ProjectsController.read);
router.post('/project-update',auth,  ProjectsController.update);
router.post('/project-delete',auth, ProjectsController.delete);


module.exports = router;