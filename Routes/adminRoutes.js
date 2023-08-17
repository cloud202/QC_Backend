const express = require('express');
const router = express.Router()
const { projectType, allProjectType, deleteProjectType, updateProjectType, projectTypeById } = require('../controller/adminController/masterController/projectTypeController');
const { projectSegment,allProjectSegment, projectSegmentById, updateProjectSegment, deleteProjectSegment } = require('../controller/adminController/masterController/projectSegmentController');
const { projectIndustry, allProjectIndustry, projectIndustryById, updateProjectIndustry, deleteProjectIndustry } = require('../controller/adminController/masterController/projectIndustryController');
const { projectPhase, allProjectPhase, projectPhaseById, updateProjectPhase, deleteProjectPhase } = require('../controller/adminController/masterController/projectPhaseController');
const { projectModule, allProjectModule, projectModuleById, updateProjectModule, deleteProjectModule } = require('../controller/adminController/masterController/projectModuleController');
const { projectTask, allProjectTask, projectTaskById, updateProjectTask, deleteProjectTask } = require('../controller/adminController/masterController/projectTaskController');


//Routes for CRUD Operations in Project Type
router.post('/api/admin/master/project_type',projectType)   //to add project_type

router.get('/api/admin/master/project_type',allProjectType) //to get all project_type

router.get('/api/admin/master/project_type/:id',projectTypeById)    //to get one project_type by its id

router.patch('/api/admin/master/project_type/:id',updateProjectType)    //to update a project_type by its id

router.delete('/api/admin/master/project_type/:id',deleteProjectType)   //to delete a project_type by its id


//Routes for CRUD operations in Project Segment
router.post('/api/admin/master/project_segment',projectSegment)  //to add project_segment

router.get('/api/admin/master/project_segment',allProjectSegment)  //to get all project_segment

router.get('/api/admin/master/project_segment/:id',projectSegmentById)  //to get one project_segment by its id

router.patch('/api/admin/master/project_segment/:id',updateProjectSegment)  //to get one project_segment by its id

router.delete('/api/admin/master/project_segment/:id',deleteProjectSegment)  //to get one project_segment by its id


// Routes for CRUD operations in Project Industry
router.post('/api/admin/master/project_industry', projectIndustry); // to add project_industry

router.get('/api/admin/master/project_industry', allProjectIndustry); // to get all project_industry

router.get('/api/admin/master/project_industry/:id', projectIndustryById); // to get one project_industry by its id

router.patch('/api/admin/master/project_industry/:id', updateProjectIndustry); // to update one project_industry by its id

router.delete('/api/admin/master/project_industry/:id', deleteProjectIndustry); // to delete one project_industry by its id


// Routes for CRUD operations in Project Phase
router.post('/api/admin/master/project_phase', projectPhase); // to add project_phase

router.get('/api/admin/master/project_phase', allProjectPhase); // to get all project_phases

router.get('/api/admin/master/project_phase/:id', projectPhaseById); // to get one project_phase by its id

router.patch('/api/admin/master/project_phase/:id', updateProjectPhase); // to update one project_phase by its id

router.delete('/api/admin/master/project_phase/:id', deleteProjectPhase); // to delete one project_phase by its id


// Routes for CRUD operations in Project Module
router.post('/api/admin/master/project_module', projectModule); // to add project_module

router.get('/api/admin/master/project_module', allProjectModule); // to get all project_module

router.get('/api/admin/master/project_module/:id', projectModuleById); // to get one project_module by its id

router.patch('/api/admin/master/project_module/:id', updateProjectModule); // to update one project_module by its id

router.delete('/api/admin/master/project_module/:id', deleteProjectModule); // to delete one project_module by its id


// Routes for CRUD operations in Project Task
router.post('/api/admin/master/project_task', projectTask); // to add project_task

router.get('/api/admin/master/project_task', allProjectTask); // to get all project_tasks

router.get('/api/admin/master/project_task/:id', projectTaskById); // to get one project_task by its id

router.patch('/api/admin/master/project_task/:id', updateProjectTask); // to update one project_task by its id

router.delete('/api/admin/master/project_task/:id', deleteProjectTask); // to delete one project_task by its id


module.exports = router;