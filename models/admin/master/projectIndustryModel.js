const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const industrySchema = new Schema({
    type_name: {
        type: String,
        required: true
    },
    type_description: {
        type: String,
        required: true
    },
    type_scope: {
        type: String,
        required: true
    },
    type_status: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('ProjectIndustry',industrySchema, 'industries');