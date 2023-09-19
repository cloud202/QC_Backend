const express = require('express');
const router = express.Router()
const projectTypeController = require('../controller/adminController/masterController/projectTypeController');
const projectSegmentController = require('../controller/adminController/masterController/projectSegmentController');
const projectIndustryController = require('../controller/adminController/masterController/projectIndustryController');
const projectPhasecontroller = require('../controller/adminController/masterController/projectPhaseController');
const projectModuleController = require('../controller/adminController/masterController/projectModuleController');
const projectTaskController = require('../controller/adminController/masterController/projectTaskController');
const projectSolutionController = require('../controller/adminController/masterController/projectSolutionController');
const projectTemplateController = require('../controller/adminController/masterController/projectTemplateController');
const projectTemplateController2 = require('../controller/adminController/masterController/projectTemplateController2');
const teckStackController = require('../controller/adminController/masterController/teckStackController');
const adminUserController = require('../controller/adminController/masterController/adminUserController');
const workloadTypeController = require('../controller/adminController/masterController/workloadTypeController');
const clientPreferenceController = require('../controller/adminController/ClientControllers/clientPreferenceController')

//Routes for CRUD Operations in Project Type
router.post('/api/admin/master/project_type', projectTypeController.storeType)   //to add project_type
router.get('/api/admin/master/project_type', projectTypeController.getAllTypes) //to get all project_type
router.get('/api/admin/master/project_type/:id', projectTypeController.getTypeByID)    //to get one project_type by its id
router.patch('/api/admin/master/project_type/:id', projectTypeController.updateType)    //to update a project_type by its id
router.delete('/api/admin/master/project_type/:id', projectTypeController.deleteType)   //to delete a project_type by its id


//Routes for CRUD operations in Project Segment
router.post('/api/admin/master/project_segment', projectSegmentController.storeSegment)  //to add project_segment
router.get('/api/admin/master/project_segment', projectSegmentController.getAllSegments)  //to get all project_segment
router.get('/api/admin/master/project_segment/:id', projectSegmentController.getSegmentByID)  //to get one project_segment by its id
router.patch('/api/admin/master/project_segment/:id', projectSegmentController.updateSegment)  //to get one project_segment by its id
router.delete('/api/admin/master/project_segment/:id', projectSegmentController.deleteSegment)  //to get one project_segment by its id


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

//Routes for CRUD opertation in Project Template
router.post('/api/admin/master/v1/project_template', projectTemplateController.storeTemplate);
router.get('/api/admin/master/v1/project_template', projectTemplateController.getAllTemnplates);
router.get('/api/admin/master/v1/project_template/:id', projectTemplateController.getTemplateById);
router.delete('/api/admin/master/v1/project_template/:id', projectTemplateController.deleteTemplate);
router.patch('/api/admin/master/v1/project_template/:id', projectTemplateController.updateTemplateById);

//Routes for CRUD opertation in Project Template new version
router.post('/api/admin/master/v2/project_template', projectTemplateController2.storeTemplate);
router.get('/api/admin/master/v2/project_template', projectTemplateController2.getAllTemnplates);
router.get('/api/admin/master/v2/project_template/:id', projectTemplateController2.getTemplateById);
router.delete('/api/admin/master/v2/project_template/:id', projectTemplateController2.deleteTemplate);
router.patch('/api/admin/master/v2/project_template/:id', projectTemplateController2.updateTemplateById);

//routes for CRUD operations for admin user
router.post('/api/admin/user', adminUserController.storeUser);
router.get('/api/admin/user', adminUserController.getAllUsers);
router.get('/api/admin/user/:id', adminUserController.getUserById);
router.patch('/api/admin/user/:id', adminUserController.updateUser);
router.delete('/api/admin/user/:id', adminUserController.deleteUser);
router.get('/api/admin/user/email/:email', adminUserController.getUserByEmail);

//routes for CRUD operations for teck stack
router.post('/api/admin/master/teck_stack', teckStackController.storeTeckStack);
router.get('/api/admin/master/teck_stack', teckStackController.getAllTechStacks);
router.get('/api/admin/master/teck_stack/:id', teckStackController.getTeckStackById);
router.patch('/api/admin/master/teck_stack/:id', teckStackController.updateTeckStack);
router.delete('/api/admin/master/teck_stack/:id', teckStackController.deleteTeckStack);

//routes for CRUD operations for application workload type
router.post('/api/admin/master/workload_type', workloadTypeController.storeWorkloadType);
router.get('/api/admin/master/workload_type', workloadTypeController.getAllWorkloadTypes);
router.get('/api/admin/master/workload_type/:id', workloadTypeController.getWorkloadTypeById);
router.patch('/api/admin/master/workload_type/:id', workloadTypeController.updateWorkloadType);
router.delete('/api/admin/master/workload_type/:id', workloadTypeController.deleteWorkloadType);

//route for project template  by Customer Preferences
router.get('/api/admin/client/template_preferences', clientPreferenceController.searchKeywordsInMultipleCollections);
router.get('/api/admin/client/template_preferences/indtype', clientPreferenceController.getFilteredTemplates);

module.exports = router;