const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    project_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    template_name: {
        type: String,
        required: true,
    },
    template_type_id: {
        type: Schema.Types.ObjectId,
        ref: "ProjectType",
        required: true,
    },
    template_segment_id: {
        type: Schema.Types.ObjectId,
        ref: "ProjectSegment",
        required: true,
    },
    template_industry_id: {
        type: Schema.Types.ObjectId,
        ref: "ProjectIndustry",
        required: true,
    },
    template_usecase: {
        type: String,
    },
    phases: [{
        phaseId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectPhase',
            required: true
        }
    }],
    modules: [{
        moduleId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectModule',
            required: true
        },
        phaseId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectPhase',
            required: true
        }
    }],
    tasks: [{
        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectTask',
            required: true
        },
        moduleId: {
            type: Schema.Types.ObjectId,
            ref: 'ProjectModule',
            required: true
        }
    }]
});

module.exports = mongoose.model('ProjectTemplate', templateSchema, 'templates');