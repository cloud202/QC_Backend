const masterTemplateSchema = require('../../../Validators/masterTemplateValidator2');
const ProjectTemplate2 = require('../../../models/admin/master/projectTemplate2');

const projectTemplateController2 = {
    async storeTemplate(req, res, next) {
        try {
            const { error } = masterTemplateSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const newTemplate = new ProjectTemplate2({ ...req.body });
            const lastSavedTemplate = await ProjectTemplate2.findOne().sort({ createdAt: -1 });
            let newProjectId = lastSavedTemplate ? parseInt(lastSavedTemplate.project_id.slice(3)) + 1 : 1;
            newTemplate.project_id = 'QC_' + newProjectId;
            const savedTemplate = await newTemplate.save();
            return res.status(201).send(savedTemplate);
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = projectTemplateController2;