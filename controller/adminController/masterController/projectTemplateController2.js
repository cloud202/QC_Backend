const masterTemplateSchema = require('../../../Validators/masterTemplateValidator2');
const ProjectTemplate2 = require('../../../models/admin/master/projectTemplate2');
const CustomErrorHandler = require("../../../services/CustomErrorHandler");

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
    },

    async getAllTemnplates(req, res, next) {
        try {
            const allTemplates = await ProjectTemplate2.find()
                .populate([{
                    path: 'template_type_id',
                    model: 'ProjectType',
                    select: ['name']
                }, {
                    path: 'template_segments.segment_id',
                    model: 'ProjectSegment',
                    select: ['name']
                }, {
                    path: 'template_industries.industry_id',
                    model: 'ProjectIndustry',
                    select: ['name']
                }])
                .select('project_id template_name template_type_id template_segment_id template_industry_id');
            return res.status(200).json(allTemplates);
        } catch (error) {
            return next(error);
        }
    },

    async getTemplateById(req, res, next) {

        try {
            const templateId = req.params.id;
            const template = await ProjectTemplate2.findById(templateId).populate([{
                path: 'template_type_id',
                model: 'ProjectType'
            }, {
                path: 'template_segments.segment_id',
                model: 'ProjectSegment',
                select: ['name']
            }, {
                path: 'template_industries.industry_id',
                model: 'ProjectIndustry',
                select: ['name']
            }, {
                path: 'phases.phasesId',
                model: 'ProjectPhase'
            }, {
                path: 'phases.modules.moduleId',
                model: 'ProjectModule'
            }, {
                path: 'phases.modules.tasks.taskId',
                model: 'ProjectTask',
                populate: {
                    path: 'task_solutionid',
                    model: 'ProjectSolution'
                }
            }]);
            if (!template) {
                return next(CustomErrorHandler.notFound('Template not found'));
            }
            return res.status(200).json(template);
        } catch (error) {
            return next(error);
        }
    },

    async deleteTemplate(req, res, next) {
        try {
            const templateId = req.params.id;
            const removedTemplate = await ProjectTemplate2.findByIdAndDelete(templateId);
            if (removedTemplate) {
                return res.status(200).json(removedTemplate);
            }
            return res.status(204).json(removedTemplate);
        } catch (error) {
            return next(error);
        }
    },

    async updateTemplateById(req, res, next) {
        try {
            const { error } = masterTemplateSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const templateId = req.params.id;
            const updatedTemplate = await ProjectTemplate2.findOneAndUpdate({ _id: templateId }, { ...req.body }, { new: true }).populate([{
                path: 'template_type_id',
                model: 'ProjectType'
            }, {
                path: 'template_segments.segment_id',
                model: 'ProjectSegment',
                select: ['name']
            }, {
                path: 'template_industries.industry_id',
                model: 'ProjectIndustry',
                select: ['name']
            }, {
                path: 'phases.phasesId',
                model: 'ProjectPhase'
            }, {
                path: 'phases.modules.moduleId',
                model: 'ProjectModule'
            }, {
                path: 'phases.modules.tasks.taskId',
                model: 'ProjectTask',
                populate: {
                    path: 'task_solutionid',
                    model: 'ProjectSolution'
                }
            }]);
            if (!updatedTemplate) {
                return next(CustomErrorHandler.notFound('Template not found'));
            }
            return res.status(200).json(updatedTemplate);
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = projectTemplateController2;