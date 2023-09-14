const WorkloadType = require('../../../models/admin/master/applicationWorkloadType');
const workloadTypeSchema = require('../../../Validators/workloadTypeValidator');
const CustomErrorHandler = require('../../../services/CustomErrorHandler');

const workloadTypeController = {
    async storeWorkloadType(req, res, next) {
        try {
            const { error } = workloadTypeSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const newWorkloadType = new WorkloadType({ ...req.body });
            const lastSavedWorkloadType = await WorkloadType.findOne().sort({ createdAt: -1 });
            let newAdminId = lastSavedWorkloadType ? parseInt(lastSavedWorkloadType.type_adminId.slice(3)) + 1 : 1;
            newWorkloadType.type_adminId = 'QC_' + newAdminId;
            const savedWorkloadType = await newWorkloadType.save();
            return res.status(201).json(savedWorkloadType);
        } catch (error) {
            return next(error);
        }
    },

    async getAllWorkloadTypes(req, res, next) {
        try {
            const allWorkloadTypes = await WorkloadType.find();
            return res.status(200).json(allWorkloadTypes);
        } catch (error) {
            return next(error);
        }
    },

    async getWorkloadTypeById(req, res, next) {
        try {
            const workloadTypeId = req.params.id;
            const workloadType = await WorkloadType.findById(workloadTypeId);
            if (!workloadType) {
                return next(CustomErrorHandler.notFound('WorkloadType not found'));
            }
            return res.status(200).json(workloadType);
        } catch (error) {
            return next(error);
        }
    },

    async updateWorkloadType(req, res, next) {
        try {
            const workloadTypeId = req.params.id;
            const { error } = workloadTypeSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const updatedWorkloadType = await WorkloadType.findOneAndUpdate({ _id: workloadTypeId }, { ...req.body }, { new: true });
            if (!updatedWorkloadType) {
                return next(CustomErrorHandler.notFound('WorkloadType not found'));
            }
            return res.status(200).json(updatedWorkloadType);
        } catch (error) {
            return next(error);
        }
    },

    async deleteWorkloadType(req, res, next) {
        try {
            const workloadTypeId = req.params.id;
            const deletedWorkloadType = await WorkloadType.findByIdAndDelete(workloadTypeId);
            if (deletedWorkloadType) {
                return res.status(200).json(deletedWorkloadType);
            }
            return res.status(204).json(deletedWorkloadType);
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = workloadTypeController;