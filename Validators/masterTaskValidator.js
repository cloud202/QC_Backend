const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);

const masterTaskSchema = Joi.object({
    name: Joi.string().required(),
    status: Joi.boolean().required(),
    task_admin_id: Joi.string(),
    task_type: Joi.string().required(),
    task_solutionid: Joi.objectId().allow(''),
    task_actionName: Joi.string().allow(''),
    task_script: Joi.string().allow('')
});

module.exports = masterTaskSchema;