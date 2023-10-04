const { MongoClient } = require('mongodb');
const ProjectIndustry = require('../../../models/admin/master/projectIndustry');
const ProjectType = require('../../../models/admin/master/projectType');
const projectTemplate2 = require('../../../models/admin/master/projectTemplate2');
const CustomErrorHandler = require('../../../services/CustomErrorHandler')

async function searchKeywordsInMultipleCollections(keywordsToSearch) {
    const uri = 'mongodb://localhost:27017';
    const dbName = 'test';
    const collectionsToSearch = ['phases', 'modules', 'templates2'];
    const fieldsToSearch = ['name', 'description', 'scope', 'template_usecase', 'template_name'];
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const results = [];
        for (const collectionName of collectionsToSearch) {
            const collection = db.collection(collectionName);
            for (const field of fieldsToSearch) {
                for (const keyword of keywordsToSearch) {
                    const regexPattern = new RegExp(keyword, 'i');
                    const query = {};
                    query[field] = { $regex: regexPattern };
                    const cursor = collection.find(query);
                    await cursor.forEach(document => {
                        if (!results.includes(document)) {
                            results.push(document._id);
                        }
                    });
                }
            }
        }
        return results;
    } catch (error) {
        return next(error);
    } finally {
        await client.close();
    }
}

const clientPreferenceController = {

    async getFilteredTemplates(req, res, next) {
        try {
            const industryId = req.body.industryId;
            const typeId = req.body.typeId;
            const techStacks = req.body.techStacks;
            const workloadTypes = req.body.workloadTypes;
            let results = await ProjectIndustry.find({ _id: industryId }).select('_id');
            results.push(...await ProjectType.find({ _id: typeId }).select('_id'));
            results = results.map(results => results._id);
            const searchIds = await searchKeywordsInMultipleCollections([...techStacks, ...workloadTypes]); 
            const aggregationPipeline = [
                {
                    $match: {
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
                    }
                }
            ];
            if (searchIds.length > 0) {
                aggregationPipeline.push({
                    $match: {
                        $or: [
                            {
                                "phases": {
                                    $elemMatch: {
                                        phasesId: { $in: searchIds },
                                    }
                                }
                            },
                            {
                                "phases.modules": {
                                    $elemMatch: {
                                        moduleId: { $in: searchIds },
                                    }
                                }
                            },
                            {
                                "_id":{ $in: searchIds }
                            }
                        ]
                    }
                });
            }
            const templates = await projectTemplate2.aggregate(aggregationPipeline);
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