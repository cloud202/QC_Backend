const { boolean } = require('joi');
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
        default: 'default_name',
        required: true
    },
    teckstack_status: {
        type: boolean,
        default: true,
        required: true
    },
    teckstack_adminId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('TeckStack', teckStackSchema, 'teckStacks');