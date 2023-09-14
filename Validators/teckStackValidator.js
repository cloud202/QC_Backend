const Joi = require('joi');

const teckStackSchema = Joi.object({
    teckstack_name: Joi.string(),
    teckstack_description: Joi.string(),
});

module.exports = teckStackSchema;