const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const industrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    industry_admin_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ProjectIndustry', industrySchema, 'industries');