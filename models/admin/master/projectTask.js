const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSolution = require('./projectSolution');

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    task_admin_id: {
        type: String,
    },
    task_id: {
        type: String,
        unique: true
    },
    task_type: {
        type: String,
        required: true,
    },
    task_solutionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectSolution'
    },
    task_actionName: {
        type: String,
    },
    task_script: {
        type: String,
    }
},{ timestamps: true })

module.exports = mongoose.model('ProjectTask', taskSchema, 'tasks');