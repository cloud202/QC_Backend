const mongoose = require('mongoose');
const masterTemplate = require('./master/masterTemplate');

const templateSchema = new mongoose.Schema({
  templateName: { 
    type: String,
    required: true 
 },
  projectType: {
    type: String,
    enum: masterTemplate.projectType,
    required: true 
},
  segment: {
    type: String,
    enum: masterTemplate.segment,
    required: true
},
  industry: {
    type: String,
    enum: masterTemplate.industry,
    required: true
},
  useCase: {
    type: String,
    required: true
}
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
