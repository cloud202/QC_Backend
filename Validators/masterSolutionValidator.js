const Joi = require('joi');

const allActionsSchema = {
    action: Joi.string().required(),
    api: Joi.string().required()
}

const masterSolutionSchema = Joi.object({
    name: Joi.string().min(1).required(),
    allActions: Joi.array().items(allActionsSchema).min(1).required()
})

module.exports = masterSolutionSchema;