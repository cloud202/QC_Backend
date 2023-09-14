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
        default: 'default_description',
        required: true
    },
    type_status: {
        type: Boolean,
        default: true,
        required: true
    },
    type_adminId: {
        type: String,
        unique: true,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('WorkloadType', workloadTypeSchema, 'workloadTypes');