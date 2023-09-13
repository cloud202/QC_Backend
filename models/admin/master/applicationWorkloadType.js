const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workloadTypeSchema = new Schema({
    type_name: {
        type: String,
        default: 'default_name',
        required: true
    },
    type_description: {
        type: String,
        default: 'default_name',
        required: true
    },
    type_status: {
        type: boolean,
        default: true,
        required: true
    },
    type_adminId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('WorkloadType', workloadTypeSchema, 'workloadTypes');