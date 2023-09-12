const Joi = require('joi');

const adminUserSchema = Joi.object({
    admin_username: Joi.string(),
    admin_email: Joi.string().email(),
    admin_phone: Joi.object({
        countrycode: Joi.string().required(),
        phoneNumber: Joi.string().required()
    }),
    admin_company: Joi.string(),
    admin_city: Joi.string(),
    admin_country: Joi.string(),
})

module.exports = adminUserSchema;