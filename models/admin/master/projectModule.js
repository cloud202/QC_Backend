const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
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
    module_admin_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ProjectModule', moduleSchema, 'modules');