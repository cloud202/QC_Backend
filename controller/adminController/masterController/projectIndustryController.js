const MasterTemplate = require("../../../models/admin/master/masterTemplate");

const projectIndustry = async (req, res) => {
  try {
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      masterTemplate = await MasterTemplate.create({});
    }

    const newProjectIndustry = {
      name,
      description,
      scope,
      supportive_id,
      status,
    };

    masterTemplate.projectIndustry.push(newProjectIndustry);
    const updatedTemplate = await masterTemplate.save();

    // Get the last item in the projectIndustry array (which is the newly added one)
    const savedIndustry = updatedTemplate.projectIndustry[updatedTemplate.projectIndustry.length - 1];

    res.status(201).json(savedIndustry);

  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

const allProjectIndustry = async (req, res) => {
  try {
    let masterTemplate = await MasterTemplate.findOne();
    if (!masterTemplate) {
      res.status(404).json({ error: "Master template is not created yet" }); 
    }

    let allProjectIndustries = masterTemplate.projectIndustry;
    if (!allProjectIndustries || allProjectIndustries.length === 0) {
      res.status(404).json({ error: "Master template does not have project industries yet" });
    }

    res.status(200).json(allProjectIndustries); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

const projectIndustryById = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' });
    }

    const projectIndustry = masterTemplate.projectIndustry.find(industry => industry._id.toString() === temp_id);

    if (!projectIndustry) {
      return res.status(404).json({ error: 'Project industry not found.' });
    }

    res.status(200).json(projectIndustry);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProjectIndustry = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' });
    }

    const indexToRemove = masterTemplate.projectIndustry.findIndex(industry => industry._id.toString() === temp_id);

    if (indexToRemove === -1) {
      return res.status(404).json({ error: 'Project industry not found.' }); 
    }

    masterTemplate.projectIndustry.splice(indexToRemove, 1);
    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: "Project industry removed", updatedProjectIndustry: updatedTemplate.projectIndustry }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProjectIndustry = async (req, res) => {
  try {
    const temp_id = req.params.id;
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' });
    }

    const projectIndustryToUpdate = masterTemplate.projectIndustry.id(temp_id);

    if (!projectIndustryToUpdate) {
      return res.status(404).json({ error: 'Project industry not found.' });
    }

    projectIndustryToUpdate.name = name;
    projectIndustryToUpdate.description = description;
    projectIndustryToUpdate.scope = scope;
    projectIndustryToUpdate.supportive_id = supportive_id;
    projectIndustryToUpdate.status = status;

    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: 'Project industry updated', updatedProjectIndustry: projectIndustryToUpdate }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { projectIndustry, projectIndustryById, allProjectIndustry, deleteProjectIndustry, updateProjectIndustry };
