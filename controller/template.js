const Template = require("../models/admin/templateSchema")

const template = async(req,res)=>{
    const {templateName,projectType,segment,industry,useCase} = req.body;

    if(!templateName || !projectType || !segment || !industry || !useCase){
        return res.status(400).json({message: "Please enter all fields"});
    }

    var newTemplate = {
        templateName: templateName,
        projectType: projectType,
        segment: segment,
        industry: industry,
        useCase: useCase
    }

    try{
        const temp = await Template.create(newTemplate);
        res.status(200).json(temp);
    }catch(e){
        return res.status(400).json(e);
    }
    
}

module.exports = {template}