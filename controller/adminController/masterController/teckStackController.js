const TeckStack = require('../../../models/admin/master/teckStack');
const teckStackSchema = require('../../../Validators/teckStackValidator');
const CustomErrorHandler = require('../../../services/CustomErrorHandler');

const teckStackController = {
    async storeTeckStack(req, res, next) {
        try {
            const { error } = teckStackSchema.validate(req.bpdy);
            if (error) {
                return next(error);
            }
            const newTeckStack = new TeckStack({ ...req.body });
            const lastSavedTeckStack = await TeckStack.findOne().sort({ createdAt: -1 });
            let newAdminId = lastSavedTeckStack ? parseInt(lastSavedTeckStack.teckstack_adminId.slice(3)) + 1 : 1;
            newTeckStack.teckstack_adminId = 'QC_' + newAdminId;
            const savedTechStack = await newTeckStack.save();
            return res.status(201).json(savedTechStack);
        } catch (error) {
            return next(error);
        }
    },

    async getAllTechStacks(req, res, next) {
        try {
            const allTechStacks = await TeckStack.find();
            return res.status(200).json(allTechStacks);
        } catch (error) {
            return next(error);
        }
    },

    async getTeckStackById(req, res, next) {
        try {
            const teckStackId = req.params.id;
            const teckStack = await TeckStack.findById(teckStackId);
            if (!teckStack) {
                return next(CustomErrorHandler.notFound('Teck Stack not found'));
            }
            return res.status(200).json(teckStack);
        } catch (error) {
            return next(error);
        }
    },

    async updateTeckStack(req, res, next) {
        try {
            const teckStackId = req.params.id;
            const { error } = teckStackSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const updatedTeckStack = await TeckStack.findOneAndUpdate({ _id: teckStackId }, { ...req.body }, { new: true });
            if (!updatedTeckStack) {
                return next(CustomErrorHandler.notFound('Teck Stack not found'));
            }
            return res.status(200).json(updatedTeckStack);
        } catch (error) {
            return next(error);
        }
    },

    async deleteTeckStack(req, res, next) {
        try {
            const teckStackId = req.params.id;
            const deletedTeckStack = await TeckStack.findByIdAndDelete(teckStackId);
            if (deletedTeckStack) {
                return res.status(200).json(deletedTeckStack);
            }
            return res.status(204).json(deletedTeckStack);
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = teckStackController;