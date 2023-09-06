const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);

const phasesSchema = {
    phaseId: Joi.objectId()
};

const modulesSchema = {
    moduleId: Joi.objectId(),
    phaseId: Joi.objectId()
};

const tasksSchema = {
    taskId: Joi.objectId(),
    moduleId: Joi.objectId()
};

const masterTemplateSchema = Joi.object({
    template_name: Joi.string().required(),
    template_type_id: Joi.objectId(),
    template_segment_id: Joi.objectId(),
    template_industry_id: Joi.objectId(),
    template_usecase:Joi.string(),
    phases: Joi.array().items(phasesSchema).min(1),
    modules: Joi.array().items(modulesSchema).min(1),
    tasks: Joi.array().items(tasksSchema).min(1)
});

module.exports = masterTemplateSchema;