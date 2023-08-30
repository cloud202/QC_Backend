const ProjectSolution = require('../../../models/admin/master/projectSolution');
const masterSolutionSchema = require('../../../Validators/masterSolutionValidator')

const projectSolutionController = {
    async storeSolution(req, res, next) {
        try {
            const { error } = masterSolutionSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const newSolution = new ProjectSolution({ ...req.body });
            const savedSolution = await newSolution.save();
            return res.status(200).json(savedSolution);
        } catch (error) {
            return next(error);
        }
    },

    async getAllSolutions(req, res, next) {
        try {
            let masterTemplate = await MasterTemplate.findOne();
            if (!masterTemplate) {
                masterTemplate = await MasterTemplate.create({});
            }
            const allSolutions = await masterTemplate.projectSolution;
            return res.status(200).json(allSolutions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async updateSolution(req, res, next) {
        try {
            const { error } = masterSolutionSchema.validate(req.body);
            if (error) {
                return res.status(422).json({ message: error.message });
            }
            let masterTemplate = await MasterTemplate.findOne();
            if (!masterTemplate) {
                return res.status(404).json({ error: 'MasterTemplate not found.' });
            }
            const _id = req.params.id;
            const oldSolution = await masterTemplate.projectSolution.id(_id);
            if (!oldSolution) {
                return res.status(404).json({ error: 'Solution not found.' });
            }
            oldSolution.name = req.body.name;
            oldSolution.allActions = req.body.allActions;
            const updatedTemplate = await masterTemplate.save();
            const updatedSolution = updatedTemplate.projectSolution.id(_id);
            return res.json({ message: "Solution updated", updatedSolution: updatedSolution });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteSolution(req, res, next) {
        try {
            let masterTemplate = await MasterTemplate.findOne();
            if (!masterTemplate) {
                return res.status(404).json({ error: 'MasterTemplate not found.' });
            }
            const _id = req.params.id;
            const indexToRemove = masterTemplate.projectSolution.findIndex(type => type._id.toString() === _id);
            if (indexToRemove === -1) {
                return res.status(404).json({ error: 'Project solution not found.' });
            }
            const removedSolution = masterTemplate.projectSolution[indexToRemove];
            masterTemplate.projectSolution.splice(indexToRemove, 1);
            const updatedTemplate = await masterTemplate.save();
            res.json({ message: "Project Solution removed", removedSolution: removedSolution });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getSolutionByID(req, res, next) {
        try {
            let masterTemplate = await MasterTemplate.findOne();
            if (!masterTemplate) {
                return res.status(404).json({ error: 'MasterTemplate not found.' });
            }
            const _id = req.params.id;
            const projectSolution = masterTemplate.projectSolution.find(type => type._id.toString() === _id);
            if (!projectSolution) {
                return res.status(404).json({ error: 'Project solution not found.' });
            }
            res.json(projectSolution);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = projectSolutionController;