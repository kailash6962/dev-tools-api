const express = require('express');
const router = express.Router();

const { 
    Project,
 } = require('../controllers/project.js');

const ProjectsController = new Project();
router.post('/project-create', ProjectsController.create);
router.post('/project-read', ProjectsController.read);
router.post('/project-update', ProjectsController.update);
router.post('/project-delete', ProjectsController.delete);


module.exports = router;