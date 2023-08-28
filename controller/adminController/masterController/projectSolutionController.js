const MasterTemplate = require('../../../models/admin/master/masterTemplate');
const masterSolutionSchema = require('../../../Validators/masterSolutionValidator')

const projectSolutionController = {
    async storeSolution(req, res, next) {
        try {
            const { error } = masterSolutionSchema.validate(req.body);
            if (error) {
                return res.status(422).json({ message: error.message });
            }
            const newSolution = { ...req.body };
            let masterTemplate = await MasterTemplate.findOne();
            if (!masterTemplate) {
                masterTemplate = await MasterTemplate.create({});
            }
            masterTemplate.projectSolution.push(newSolution);
            const savedTemplate = await masterTemplate.save();
            const savedSolution = savedTemplate.projectSolution[savedTemplate.projectSolution.length - 1];
            return res.status(200).json(savedSolution);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
    }
}

module.exports = projectSolutionController;