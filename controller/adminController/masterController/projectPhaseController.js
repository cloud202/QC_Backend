const MasterTemplate = require("../../../models/admin/master/masterTemplate");

const projectPhase = async (req, res) => {
  try {
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      masterTemplate = await MasterTemplate.create({});
    }

    const newProjectPhase = {
      name,
      description,
      scope,
      supportive_id,
      status,
    };

    masterTemplate.projectPhase.push(newProjectPhase);
    const updatedTemplate = await masterTemplate.save();

    // Get the last item in the projectModule array (which is the newly added one)
    const savedPhase = updatedTemplate.projectPhase[updatedTemplate.projectPhase.length - 1];

    res.status(201).json(savedPhase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allProjectPhase = async (req, res) => {
  try {
    let masterTemplate = await MasterTemplate.findOne();
    if (!masterTemplate) {
      res.status(404).json({ error: "Master template is not created yet" });
    }

    let allProjectPhases = masterTemplate.projectPhase;
    if (!allProjectPhases) {
      res.status(404).json({ error: "Master template does not have project phases yet" });
    }

    res.status(200).json(allProjectPhases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const projectPhaseById = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: "MasterTemplate not found." });
    }

    const projectPhase = masterTemplate.projectPhase.find(phase => phase._id.toString() === temp_id);

    if (!projectPhase) {
      return res.status(404).json({ error: "Project phase not found." });
    }

    res.status(200).json(projectPhase);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProjectPhase = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: "MasterTemplate not found." });
    }

    const indexToRemove = masterTemplate.projectPhase.findIndex(phase => phase._id.toString() === temp_id);

    if (indexToRemove === -1) {
      return res.status(404).json({ error: "Project phase not found." });
    }

    masterTemplate.projectPhase.splice(indexToRemove, 1);
    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: "Project phase removed", updatedProjectPhase: updatedTemplate.projectPhase });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProjectPhase = async (req, res) => {
  try {
    const temp_id = req.params.id;
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: "MasterTemplate not found." });
    }

    const projectPhaseToUpdate = masterTemplate.projectPhase.id(temp_id);

    if (!projectPhaseToUpdate) {
      return res.status(404).json({ error: "Project phase not found." });
    }

    projectPhaseToUpdate.name = name;
    projectPhaseToUpdate.description = description;
    projectPhaseToUpdate.scope = scope;
    projectPhaseToUpdate.supportive_id = supportive_id;
    projectPhaseToUpdate.status = status;

    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: "Project phase updated", updatedProjectPhase: projectPhaseToUpdate });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { projectPhase, projectPhaseById, allProjectPhase, deleteProjectPhase, updateProjectPhase };
