const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);

const tasksSchema = Joi.object({
    taskId: Joi.objectId().required()
});

const modulesSchema = Joi.object({
    moduleId: Joi.objectId().required(),
    tasks: Joi.array().items(tasksSchema).min(1)
});

const phasesSchema = Joi.object({
    phasesId: Joi.objectId().required(),
    modules: Joi.array().items(modulesSchema).min(1)
});

const masterTemplateSchema = Joi.object({
    template_name: Joi.string().required(),
    template_type_id: Joi.objectId().required(),
    template_segment_id: Joi.objectId().required(),
    template_industry_id: Joi.objectId().required(),
    template_usecase: Joi.string().allow(''),
    phases: Joi.array().items(phasesSchema).min(1)
});

module.exports = masterTemplateSchema;