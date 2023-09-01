const ProjectSolution = require('../../../models/admin/master/projectSolution');
const masterSolutionSchema = require('../../../Validators/masterSolutionValidator')
const CustomErrorHandler = require("../../../services/CustomErrorHandler");

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
            const allSolutions = await ProjectSolution.find();
            return res.status(200).json(allSolutions);
        } catch (error) {
            return next(error);
        }
    },

    async updateSolution(req, res, next) {
        try {
            const { error } = masterSolutionSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const solutionId = req.params.id;
            const updatedSolution = await ProjectSolution.findOneAndUpdate({ _id: solutionId }, { ...req.body }, { new: true });
            if (!updatedSolution) {
                return next(CustomErrorHandler.notFound('Solution not found'));
            }
            return res.status(200).json(updatedSolution);
        } catch (error) {
            return next(error);
        }
    },

    async deleteSolution(req, res, next) {
        try {
            const solutionId = req.params.id;
            const removedSolution = await ProjectSolution.findByIdAndDelete({ _id: solutionId });
            if (removedSolution)
                return res.status(200).json(removedSolution);
            return res.status(204).json(removedSolution);
        } catch (error) {
            return next(error);
        }
    },

    async getSolutionByID(req, res, next) {
        try {
            const solutionId = req.params.id;
            const solution = await ProjectSolution.findById(solutionId);
            if (!solution) {
                return next(CustomErrorHandler.notFound('Solution not found'));
            }
            return res.status(200).json(solution);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = projectSolutionController;