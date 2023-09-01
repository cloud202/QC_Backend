const ProjectModule = require('../../../models/admin/master/projectModule');
const masterModuleSchema = require('../../../Validators/masterModuleValidator');
const CustomErrorHandler = require('../../../services/CustomErrorHandler');

const projectModuleController = {
  async storeModule(req, res, next) {
    try {
      const { error } = masterModuleSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const newModule = new ProjectModule({ ...req.body });
      const savedModule = await newModule.save();
      return res.status(200).json(savedModule);
    } catch (error) {
      return next(error);
    }
  },

  async getAllModules(req, res, next) {
    try {
      const allModules = await ProjectModule.find();
      return res.status(200).json(allModules);
    } catch (error) {
      return next(error);
    }
  },

  async updateModule(req, res, next) {
    try {
      const { error } = masterModuleSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const moduleId = req.params.id;
      const updatedModule = await ProjectModule.findOneAndUpdate({ _id: moduleId }, { ...req.body }, { new: true })
      if (!updatedModule) {
        return next(CustomErrorHandler.notFound('Module not found'));
      }
      return res.status(200).json(updatedModule);
    } catch (error) {
      return next(error);
    }
  },

  async deleteModule(req, res, next) {
    try {
      const moduleId = req.params.id;
      const removedModule = await ProjectModule.findByIdAndDelete({ _id: moduleId });
      if (removedModule)
        return res.status(200).json(removedModule);
      return res.status(204).json(removedModule);
    } catch (error) {
      return next(error);
    }
  },

  async getModuleByID(req, res, next) {
    const moduleId = req.params.id;
    const module = await ProjectModule.findById(moduleId);
    if (!module) {
      return next(CustomErrorHandler.notFound('Module not found'));
    }
    return res.status(200).json(module);
  },
}

module.exports = projectModuleController;
