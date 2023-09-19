const { MongoClient } = require('mongodb');
const ProjectIndustry = require('../../../models/admin/master/projectIndustry');
const ProjectType = require('../../../models/admin/master/projectType');
const projectTemplate2 = require('../../../models/admin/master/projectTemplate2');

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
                $or: [
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
}

module.exports = clientPreferenceController;