const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    phases: [{
        phaseId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectPhase'
        }
    }],
    modules: [{
        moduleId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectModule'
        },
        phaseId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectPhase'
        }
    }],
    tasks: [{
        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectTask'
        },
        moduleId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectModule'
        }
    }]
});

module.exports = mongoose.model('ProjectTemplate', templateSchema, 'templates');