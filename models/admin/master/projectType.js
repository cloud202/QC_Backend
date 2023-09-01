const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
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
    type_admin: {
        type: String,
        default: 'default',
        // required: true
    }
})

module.exports = mongoose.model('ProjectType', typeSchema, 'types');