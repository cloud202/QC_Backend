const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ProjectSolution = require('./projectSolution');

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
        required: true
    },
    task_id: {
        type: String,
        required: true,
        unique: true
    },
    task_type: {
        type: String,
        required: true,
    },
    task_solutionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectSolution"
    },
    task_actionName: {
        type: String,
        required: true,
    },
    task_script: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('ProjectTask', taskSchema, 'tasks');