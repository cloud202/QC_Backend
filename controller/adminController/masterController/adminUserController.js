const adminUserSchema = require('../../../Validators/adminUserValidator');
const AdminUser = require('../../../models/admin/adminUser')
const CustomErrorHandler = require('../../../services/CustomErrorHandler');

const adminUserController = {
    async storeUser(req, res, next) {
        try {
            const { error } = adminUserSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const newUser = new AdminUser({ ...req.body });
            const lastSavedUser = await AdminUser.findOne().sort({ createdAt: -1 });
            let newAdminId = lastSavedUser ? parseInt(lastSavedUser.admin_id.slice(3)) + 1 : 1;
            newUser.admin_id = 'QC_' + newAdminId;
            const savedUser = await newUser.save();
            return res.status(201).json(savedUser);
        } catch (error) {
            return next(error);
        }
    },

    async getAllUsers(req, res, next) {
        try {
            const allUsers = await AdminUser.find();
            return res.status(200).json(allUsers);
        } catch (error) {
            return next(error);
        }
    },

    async updateUser(req, res, next) {
        try {
            const { error } = adminUserSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            const userId = req.params.id;
            const updatedUser = await AdminUser.findOneAndUpdate({ _id: userId }, { ...req.body }, { new: true });
            if (!updatedUser) {
                return next(CustomErrorHandler.notFound('User not found'));
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            return next(error);
        }
    },

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;
            const deletedUser = await AdminUser.findByIdAndDelete(userId);
            if (deletedUser) {
                return res.status(200).json(deletedUser);
            }
            return res.status(204).json(deletedUser);
        } catch (error) {
            return next(error);
        }
    },

    async getUserById(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await AdminUser.findById(userId);
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found'));
            }
            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    },

    async getUserByEmail(req, res, next) {
        try {
            const userEmail = req.params.email;
            let user = await AdminUser.findOne({ admin_email: userEmail });
            if (!user) {
                user = new AdminUser({ admin_email: userEmail });
                const lastSavedUser = await AdminUser.findOne().sort({ createdAt: -1 });
                let newAdminId = lastSavedUser ? parseInt(lastSavedUser.admin_id.slice(3)) + 1 : 1;
                user.admin_id = 'QC_' + newAdminId;
                user = await user.save();
                return res.status(201).json(user);
            }
            return res.status(200).json(user);  
        } catch (error) {
            return next(error);
        }
    },
};

module.exports = adminUserController;