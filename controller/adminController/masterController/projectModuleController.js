const MasterTemplate = require("../../../models/admin/master/masterTemplate");

const projectModule = async (req, res) => {
  try {
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      masterTemplate = await MasterTemplate.create({});
    }

    const newProjectModule = {
      name,
      description,
      scope,
      supportive_id,
      status,
    };

    masterTemplate.projectModule.push(newProjectModule);
    const updatedTemplate = await masterTemplate.save();

    // Get the last item in the projectModule array (which is the newly added one)
    const savedModule = updatedTemplate.projectModule[updatedTemplate.projectModule.length - 1];

    res.status(201).json(savedModule);

  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

const allProjectModule = async (req, res) => {
  try {
    let masterTemplate = await MasterTemplate.findOne();
    if (!masterTemplate) {
      res.status(404).json({ error: "Master template is not created yet" }); // 404 Not Found
    }

    let allProjectModules = masterTemplate.projectModule;
    if (!allProjectModules || allProjectModules.length === 0) {
      res.status(404).json({ error: "Master template does not have project modules yet" });
    }

    res.status(200).json(allProjectModules); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const projectModuleById = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const projectModule = masterTemplate.projectModule.find(module => module._id.toString() === temp_id);

    if (!projectModule) {
      return res.status(404).json({ error: 'Project module not found.' });
    }

    res.status(200).json(projectModule); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const deleteProjectModule = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const indexToRemove = masterTemplate.projectModule.findIndex(module => module._id.toString() === temp_id);

    if (indexToRemove === -1) {
      return res.status(404).json({ error: 'Project module not found.' });
    }

    masterTemplate.projectModule.splice(indexToRemove, 1);
    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: "Project module removed", updatedProjectModule: updatedTemplate.projectModule }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const updateProjectModule = async (req, res) => {
  try {
    const temp_id = req.params.id;
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const projectModuleToUpdate = masterTemplate.projectModule.id(temp_id);

    if (!projectModuleToUpdate) {
      return res.status(404).json({ error: 'Project module not found.' });
    }

    projectModuleToUpdate.name = name;
    projectModuleToUpdate.description = description;
    projectModuleToUpdate.scope = scope;
    projectModuleToUpdate.supportive_id = supportive_id;
    projectModuleToUpdate.status = status;

    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: 'Project module updated', updatedProjectModule: projectModuleToUpdate }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

module.exports = { projectModule, projectModuleById, allProjectModule, deleteProjectModule, updateProjectModule };
