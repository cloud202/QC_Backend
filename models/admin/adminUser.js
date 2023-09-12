const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
    admin_id: {
        type: String,
        unique: true,
        required: true
    },
    admin_username: {
        type: String,
    },
    admin_email: {
        type: String,
        unique: true,
    },
    admin_phone: {
        countrycode: String,
        phoneNumber: String
    },
    admin_company: {
        type: String,
    },
    admin_city: {
        type: String,
    },
    admin_country: {
        type: String,
    },
    admin_status: {
        type: Boolean,
    }
}, { timestamps: true });

module.exports = mongoose.model('AdminUser', adminUserSchema, 'adminUsers');