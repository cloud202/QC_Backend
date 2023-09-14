const Joi = require('joi');

const workloadTypeSchema = Joi.object({
    type_name: Joi.string(),
    type_description: Joi.string(),
});

module.exports = workloadTypeSchema;