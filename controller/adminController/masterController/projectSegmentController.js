const MasterTemplate = require("../../../models/admin/master/masterTemplate");

const projectSegment = async(req,res)=>{
    try {
        const {name,description,scope,supportive_id,status} = req.body;
    
        let masterTemplate = await MasterTemplate.findOne();
    
        if (!masterTemplate) {
          masterTemplate = await MasterTemplate.create({});
        }
        
        const newProjectSegment = {
          name,
          description,
          scope,
          supportive_id,
          status,
        };
        
        masterTemplate.projectSegment.push(newProjectSegment);
        const updatedTemplate = await masterTemplate.save();

        // Get the last item in the projectModule array (which is the newly added one)
        const savedSegment = updatedTemplate.projectSegment[updatedTemplate.projectSegment.length - 1];

        res.status(201).json(savedSegment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const allProjectSegment = async(req,res)=>{
  try{
    let masterTemplate = await MasterTemplate.findOne();
    if (!masterTemplate) {
      res.status(4000).json({error: "Master template is not created yet"})
    }

    let allProjectSegment = masterTemplate.projectSegment;
    if(!allProjectSegment){
      res.status(4000).json({error: "Master template does not have project type yet"})
    }

    res.status(200).json(allProjectSegment)
  }catch(e){
    res.status(500).json({ error: 'Internal server error' });
  }
}

const projectSegmentById = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const projectSegment = masterTemplate.projectSegment.find(segment => segment._id.toString() === temp_id);

    if (!projectSegment) {
      return res.status(404).json({ error: 'Project segment not found.' }); // 404 Not Found
    }

    res.status(200).json(projectSegment); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const deleteProjectSegment = async (req, res) => {
  try {
    const temp_id = req.params.id;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const indexToRemove = masterTemplate.projectSegment.findIndex(segment => segment._id.toString() === temp_id);

    if (indexToRemove === -1) {
      return res.status(404).json({ error: 'Project segment not found.' }); // 404 Not Found
    }

    masterTemplate.projectSegment.splice(indexToRemove, 1);
    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: "Project segment removed", updatedProjectSegment: updatedTemplate.projectSegment }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

const updateProjectSegment = async (req, res) => {
  try {
    const temp_id = req.params.id;
    const { name, description, scope, supportive_id, status } = req.body;

    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' }); // 404 Not Found
    }

    const projectSegmentToUpdate = masterTemplate.projectSegment.id(temp_id);

    if (!projectSegmentToUpdate) {
      return res.status(404).json({ error: 'Project segment not found.' }); // 404 Not Found
    }

    projectSegmentToUpdate.name = name;
    projectSegmentToUpdate.description = description;
    projectSegmentToUpdate.scope = scope;
    projectSegmentToUpdate.supportive_id = supportive_id;
    projectSegmentToUpdate.status = status;

    const updatedTemplate = await masterTemplate.save();

    res.status(200).json({ message: 'Project segment updated', updatedProjectSegment: projectSegmentToUpdate }); // 200 OK

  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

module.exports = { projectSegment, projectSegmentById, allProjectSegment, deleteProjectSegment, updateProjectSegment };
