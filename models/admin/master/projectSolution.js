const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    allActions: [{
        action: {
            type: String,
            required: true
        },
        api: {
            type: String,
            required: true
        }
    }],
    status: {
        type: Boolean,
        default: true
    },
    solution_admin_id: {
        type: String,
        default: 'defaultid'
    }
})
module.exports = mongoose.model('ProjectSolution', solutionSchema, 'solutions');
// module.exports = ProjectSolution;