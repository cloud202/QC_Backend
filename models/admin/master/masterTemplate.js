const mongoose = require('mongoose');

const masterTemplateSchema = new mongoose.Schema({
  projectType: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    supportive_id: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  }],

  projectSegment: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    supportive_id: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  }],

  projectIndustry: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    supportive_id: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  }],

  projectPhase: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    supportive_id: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  }],

  projectModule: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    supportive_id: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  }],
  
  projectTask: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    supportive_id: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }
  }]
});

const MasterTemplate = mongoose.model('MasterTemplate', masterTemplateSchema);

module.exports = MasterTemplate;
