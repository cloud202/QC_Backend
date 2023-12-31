const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teckStackSchema = new Schema({
    teckstack_name: {
        type: String,
        default: 'default_name',
        required: true
    },
    teckstack_description: {
        type: String,
        default: 'default_description',
        required: true
    },
    teckstack_status: {
        type: Boolean,
        default: true,
        required: true
    },
    teckstack_adminId: {
        type: String,
        unique: true,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('TeckStack', teckStackSchema, 'teckStacks');