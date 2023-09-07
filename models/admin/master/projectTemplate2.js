const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    project_id: {
        type: String,
        unique: true,
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
        phasesId: {
            type: Schema.Types.ObjectId,
            ref: "ProjectPhase"
        },
        modules: [{
            moduleId: {
                type: Schema.Types.ObjectId,
                ref: "ProjectModule"
            },
            tasks: [{
                taskId: {
                    type: Schema.Types.ObjectId,
                    ref: "ProjectTask",
                }
            }]
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('ProjectTemplate', templateSchema, 'templates');