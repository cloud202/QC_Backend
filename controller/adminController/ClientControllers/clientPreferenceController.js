const { MongoClient } = require('mongodb');
const ProjectIndustry = require('../../../models/admin/master/projectIndustry');
const ProjectType = require('../../../models/admin/master/projectType');
const projectTemplate2 = require('../../../models/admin/master/projectTemplate2');
const CustomErrorHandler = require('../../../services/CustomErrorHandler')

const clientPreferenceController = {
    async searchKeywordsInMultipleCollections(req, res, next) {
        const uri = 'mongodb://localhost:27017'; // MongoDB connection string
        const dbName = 'test'; // Your database name
        const collectionsToSearch = ['phases', 'modules', 'tasks']; // Array of collection names
        const fieldsToSearch = ['name', 'description', 'task_actionName']; // Array of keys (fields) to search within
        const keywordsToSearch = ['Migration', 'Modernization', 'Greenfield']; // Array of keywords to search for

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();
            const db = client.db(dbName);
            const results = [];
            for (const collectionName of collectionsToSearch) {
                const collection = db.collection(collectionName);
                for (const field of fieldsToSearch) {
                    for (const keyword of keywordsToSearch) {
                        const regexPattern = new RegExp(keyword, 'i'); // Case-insensitive search
                        const query = {};
                        query[field] = { $regex: regexPattern };
                        const cursor = collection.find(query);
                        await cursor.forEach(document => {
                            results.push(document._id);
                        });
                    }
                }
            }
            res.status(200).json(results);
        } catch (error) {
            return next(error);
        } finally {
            await client.close();
        }
    },

    async getFilteredTemplates(req, res, next) {
        try {
            const industryId = req.body.industry_id;
            const type_id = req.body.type_id;
            let results = await ProjectIndustry.find({ _id: industryId }).select('_id');
            results.push(...await ProjectType.find({ _id: type_id }).select('_id'));
            results = results.map(results => results._id);
            console.log(results);
            const templates = await projectTemplate2.find({
                $and: [
                    { template_type_id: { $in: results } },
                    {
                        template_industries: {
                            $elemMatch: {
                                industry_id: { $in: results },
                            }
                        }
                    }
                ]
            });
            return res.status(200).json(templates);
        } catch (error) {
            return next(error);
        }
    },

    async getTemplatePhases(req, res, next) {
        try {
            const templateId = req.params.id;
            const template = await projectTemplate2.findById(templateId).select('phasesId').populate('phases.phasesId');
            if (!template) {
                return next(CustomErrorHandler.notFound('Template not found'));
            }
            const processedPhases = {};
            const phases = template.phases.reduce((result, phase) => {
                const key = phase.phasesId._id;
                if (key in processedPhases === false) {
                    processedPhases[key] = key;
                    result.push(phase.phasesId);
                }
                return result;
            }, []);
            return res.status(200).json(phases);
        } catch (error) {
            return next(error);
        }
    },

    async getTemplateModules(req, res, next) {
        try {
            const templateId = req.params.id;
            const template = await projectTemplate2.findById(templateId).select('moduleId').populate('phases.modules.moduleId');
            if (!template) {
                return next(CustomErrorHandler.notFound('Template not found'));
            }
            const processedModules = {};
            const modules = template.phases.reduce((result, phase) => {
                const newModules = phase.modules.reduce((result, module) => {
                    const key = module.moduleId._id;
                    if (key in processedModules === false) {
                        processedModules[key] = key;
                        result.push(module.moduleId);
                    }
                    return result;
                }, []);
                result.push(...newModules);
                return result;
            }, []);
            return res.status(200).json(modules);
        } catch (error) {
            return next(error);
        }
    },

    async getTemplateTasks(req, res, next) {
        try {
            const templateId = req.params.id;
            const template = await projectTemplate2.findById(templateId).select('taskId').populate('phases.modules.tasks.taskId');
            if (!template) {
                return next(CustomErrorHandler.notFound('Template not found'));
            }
            const processedTasks = {};
            const result = [];
            template.phases.forEach(phase => {
                phase.modules.forEach(module => {
                    module.tasks.forEach(task => {
                        const key = task.taskId._id;
                        if (key in processedTasks === false) {
                            processedTasks[key] = key;
                            result.push(task.taskId);
                        }
                    });
                })
            })
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    },
}

module.exports = clientPreferenceController;