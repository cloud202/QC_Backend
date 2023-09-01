const Joi = require('joi');
const masterSegmentSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    scope: Joi.string().required(),
    status: Joi.boolean().required(),
})
module.exports = masterSegmentSchema;