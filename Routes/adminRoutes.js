const express = require('express');
const router = express.Router()
const { projectType, allProjectType, deleteProjectType, updateProjectType, projectTypeById } = require('../controller/adminController/masterController/projectTypeController');
const { projectSegment, allProjectSegment, projectSegmentById, updateProjectSegment, deleteProjectSegment } = require('../controller/adminController/masterController/projectSegmentController');
const projectIndustryController = require('../controller/adminController/masterController/projectIndustryController');
const projectPhasecontroller = require('../controller/adminController/masterController/projectPhaseController');
const projectModuleController = require('../controller/adminController/masterController/projectModuleController');
const projectTaskController = require('../controller/adminController/masterController/projectTaskController');
const projectSolutionController = require('../controller/adminController/masterController/projectSolutionController')

//Routes for CRUD Operations in Project Type
router.post('/api/admin/master/project_type', projectType)   //to add project_type

router.get('/api/admin/master/project_type', allProjectType) //to get all project_type

router.get('/api/admin/master/project_type/:id', projectTypeById)    //to get one project_type by its id

router.patch('/api/admin/master/project_type/:id', updateProjectType)    //to update a project_type by its id

router.delete('/api/admin/master/project_type/:id', deleteProjectType)   //to delete a project_type by its id


//Routes for CRUD operations in Project Segment
router.post('/api/admin/master/project_segment', projectSegment)  //to add project_segment

router.get('/api/admin/master/project_segment', allProjectSegment)  //to get all project_segment

router.get('/api/admin/master/project_segment/:id', projectSegmentById)  //to get one project_segment by its id

router.patch('/api/admin/master/project_segment/:id', updateProjectSegment)  //to get one project_segment by its id

router.delete('/api/admin/master/project_segment/:id', deleteProjectSegment)  //to get one project_segment by its id


// Routes for CRUD operations in Project Industry
router.post('/api/admin/master/project_industry', projectIndustryController.storeIndustry); // to add project_industry
router.get('/api/admin/master/project_industry', projectIndustryController.getAllIndustries); // to get all project_industry
router.get('/api/admin/master/project_industry/:id', projectIndustryController.getIndustryByID); // to get one project_industry by its id
router.patch('/api/admin/master/project_industry/:id', projectIndustryController.updateIndustry); // to update one project_industry by its id
router.delete('/api/admin/master/project_industry/:id', projectIndustryController.deleteIndustry); // to delete one project_industry by its id


// Routes for CRUD operations in Project Phase
router.post('/api/admin/master/project_phase', projectPhasecontroller.storePhase); // to add project_phase
router.get('/api/admin/master/project_phase', projectPhasecontroller.getAllPhases); // to get all project_phases
router.get('/api/admin/master/project_phase/:id', projectPhasecontroller.getPhaseByID); // to get one project_phase by its id
router.patch('/api/admin/master/project_phase/:id', projectPhasecontroller.updatePhase); // to update one project_phase by its id
router.delete('/api/admin/master/project_phase/:id', projectPhasecontroller.deletePhase); // to delete one project_phase by its id


// Routes for CRUD operations in Project Module
router.post('/api/admin/master/project_module', projectModuleController.storeModule); // to add project_module
router.get('/api/admin/master/project_module', projectModuleController.getAllModules); // to get all project_module
router.get('/api/admin/master/project_module/:id', projectModuleController.getModuleByID); // to get one project_module by its id
router.patch('/api/admin/master/project_module/:id', projectModuleController.updateModule); // to update one project_module by its id
router.delete('/api/admin/master/project_module/:id', projectModuleController.deleteModule); // to delete one project_module by its id

// Routes for CRUD operations in Project Task
router.post('/api/admin/master/project_task', projectTaskController.storeTask); // to add project_task
router.get('/api/admin/master/project_task', projectTaskController.getAllTasks); // to get all project_tasks
router.get('/api/admin/master/project_task/:id', projectTaskController.getTaskById); // to get one project_task by its id
router.patch('/api/admin/master/project_task/:id', projectTaskController.updateTask); // to update one project_task by its id
router.delete('/api/admin/master/project_task/:id', projectTaskController.deleteTask); // to delete one project_task by its id

//Routes for CRUD Operations in Project Solution
router.post('/api/admin/master/project_solution', projectSolutionController.storeSolution);
router.get('/api/admin/master/project_solution', projectSolutionController.getAllSolutions);
router.get('/api/admin/master/project_solution/:id', projectSolutionController.getSolutionByID);
router.patch('/api/admin/master/project_solution/:id', projectSolutionController.updateSolution);
router.delete('/api/admin/master/project_solution/:id', projectSolutionController.deleteSolution);

module.exports = router;