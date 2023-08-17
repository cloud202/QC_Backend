const MasterTemplate = require("../../../models/admin/master/masterTemplate");

const projectTask = async (req, res) => {
  try {
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      masterTemplate = await MasterTemplate.create({});
    }

    const newProjectTask = {
      name,
      description,
      scope,
      supportive_id,
      status,
    };

    masterTemplate.projectTask.push(newProjectTask);
    const updatedTemplate = await masterTemplate.save();

    // Get the last item in the projectModule array (which is the newly added one)
    const savedTask = updatedTemplate.projectTask[updatedTemplate.projectTask.length - 1];

    res.status(201).json(savedTask);

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const allProjectTask = async (req, res) => {
  try {
    let masterTemplate = await MasterTemplate.findOne();
    if (!masterTemplate) {
      res.status(404).json({ error: "Master template is not created yet" });
    }

    let allProjectTasks = masterTemplate.projectTask;
    if (!allProjectTasks || allProjectTasks.length === 0) {
      res.status(404).json({ error: "Master template does not have project tasks yet" });
    }

    res.status(200).json(allProjectTasks); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const projectTaskById = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const projectTask = masterTemplate.projectTask.find(task => task._id.toString() === temp_id);

    if (!projectTask) {
      return res.status(404).json({ error: 'Project task not found.' }); // 404 Not Found
    }

    res.status(200).json(projectTask); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const deleteProjectTask = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const indexToRemove = masterTemplate.projectTask.findIndex(task => task._id.toString() === temp_id);

    if (indexToRemove === -1) {
      return res.status(404).json({ error: 'Project task not found.' }); // 404 Not Found
    }

    masterTemplate.projectTask.splice(indexToRemove, 1);
    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: "Project task removed", updatedProjectTask: updatedTemplate.projectTask }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const updateProjectTask = async (req, res) => {
  try {
    const temp_id = req.params.id;
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const projectTaskToUpdate = masterTemplate.projectTask.id(temp_id);

    if (!projectTaskToUpdate) {
      return res.status(404).json({ error: 'Project task not found.' }); // 404 Not Found
    }

    projectTaskToUpdate.name = name;
    projectTaskToUpdate.description = description;
    projectTaskToUpdate.scope = scope;
    projectTaskToUpdate.supportive_id = supportive_id;
    projectTaskToUpdate.status = status;

    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: 'Project task updated', updatedProjectTask: projectTaskToUpdate }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

module.exports = { projectTask, projectTaskById, allProjectTask, deleteProjectTask, updateProjectTask };
