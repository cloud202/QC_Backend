const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);

const phasesSchema = {
    phaseId: Joi.objectId().allow('')
};

const modulesSchema = {
    moduleId: Joi.objectId().allow(''),
    phaseId: Joi.objectId().allow('')
};

const tasksSchema = {
    taskId: Joi.objectId().allow(''),
    moduleId: Joi.objectId().allow('')
};

const masterTemplateSchema = Joi.object({
    phases: Joi.array().items(phasesSchema),
    modules: Joi.array().items(modulesSchema),
    tasks: Joi.array().items(tasksSchema)
});

module.exports = masterTemplateSchema;