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
    }]
})

module.exports = mongoose.model('ProjectSolution', solutionSchema, 'solutions');