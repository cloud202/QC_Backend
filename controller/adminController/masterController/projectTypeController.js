const MasterTemplate = require("../../../models/admin/master/masterTemplate");

const projectType = async(req,res)=>{
    try {
        const {name,description,scope,supportive_id,status} = req.body;
    
        let masterTemplate = await MasterTemplate.findOne();
    
        if (!masterTemplate) {
          masterTemplate = await MasterTemplate.create({});
        }

        const newProjectType = {
          name,
          description,
          scope,
          supportive_id,
          status,
        };
        
        masterTemplate.projectType.push(newProjectType);
        const updatedTemplate = await masterTemplate.save();

      // Get the last item in the projectModule array (which is the newly added one)
      const savedType = updatedTemplate.projectType[updatedTemplate.projectType.length - 1];

      res.status(201).json(savedType);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const allProjectType = async(req,res)=>{
  try{
    let masterTemplate = await MasterTemplate.findOne();
    if (!masterTemplate) {
      res.status(4000).json({error: "Master template is not created yet"})
    }

    let allProjectType = masterTemplate.projectType;
    if(!allProjectType){
      res.status(4000).json({error: "Master template does not have project type yet"})
    }

    res.status(200).json(allProjectType)
  }catch(e){
    res.status(500).json({ error: error.message });
  }
}

const projectTypeById = async (req, res) => {
  try {
    const temp_id = req.params.id;
    
    let masterTemplate = await MasterTemplate.findOne();

    if (!masterTemplate) {
      return res.status(404).json({ error: 'MasterTemplate not found.' });
    }

    const projectType = masterTemplate.projectType.find(type => type._id.toString() === temp_id);

    if (!projectType) {
      return res.status(404).json({ error: 'Project type not found.' });
    }

    res.json(projectType);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteProjectType = async (req, res) => {
    try {
      const temp_id = req.params.id;
      
      let masterTemplate = await MasterTemplate.findOne();
  
      if (!masterTemplate) {
        return res.status(404).json({ error: 'MasterTemplate not found.' });
      }
      const indexToRemove = masterTemplate.projectType.findIndex(type => type._id.toString() === temp_id);
  
      if (indexToRemove === -1) {
        return res.status(404).json({ error: 'Project type not found.' });
      }
  
      masterTemplate.projectType.splice(indexToRemove, 1);
      const updatedTemplate = await masterTemplate.save();

      res.json({ message: "Project type removed", updatedProjectType: updatedTemplate.projectType });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateProjectType = async (req, res) => {
    try {
      const temp_id = req.params.id;
      const { name, description, scope, supportive_id, status } = req.body;
  
      let masterTemplate = await MasterTemplate.findOne();
  
      if (!masterTemplate) {
        return res.status(404).json({ error: 'MasterTemplate not found.' });
      }
  
      const projectTypeToUpdate = masterTemplate.projectType.id(temp_id);
  
      if (!projectTypeToUpdate) {
        return res.status(404).json({ error: 'Project type not found.' });
      }
  
      projectTypeToUpdate.name = name;
      projectTypeToUpdate.description = description;
      projectTypeToUpdate.scope = scope;
      projectTypeToUpdate.supportive_id = supportive_id;
      projectTypeToUpdate.status = status;
  
      const updatedTemplate = await masterTemplate.save();
  
      res.json({ message: 'Project type updated', updatedProjecType : projectTypeToUpdate });
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  };
  

module.exports = {projectType,projectTypeById,allProjectType,deleteProjectType,updateProjectType};