const ProjectType = require('../../../models/admin/master/projectType');
const masterTypeSchema = require('../../../Validators/masterTypeValidator');
const CustomErrorHandler = require('../../../services/CustomErrorHandler');
const projectTypeController = {
  async storeType(req, res, next) {
    try {
      const { error } = masterTypeSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const newType = new ProjectType({ ...req.body });
      const savedType = await newType.save();
      return res.status(200).json(savedType);
    } catch (error) {
      return next(error);
    }
  },

  async getAllTypes(req, res, next) {
    try {
      const allTypes = await ProjectType.find();
      return res.status(200).json(allTypes);
    } catch (error) {
      return next(error);
    }
  },

  async updateType(req, res, next) {
    try {
      const { error } = masterTypeSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const typeId = req.params.id;
      const updatedType = await ProjectType.findOneAndUpdate({ _id: typeId }, { ...req.body }, { new: true })
      if (!updatedType) {
        return next(CustomErrorHandler.notFound('Type not found'));
      }
      return res.status(200).json(updatedType);
    } catch (error) {
      return next(error);
    }
  },

  async deleteType(req, res, next) {
    try {
      const typeId = req.params.id;
      const removedType = await ProjectType.findByIdAndDelete({ _id: typeId });
      if (removedType)
        return res.status(200).json(removedType);
      return res.status(204).json(removedType);
    } catch (error) {
      return next(error);
    }
  },

  async getTypeByID(req, res, next) {
    try {
      const typeId = req.params.id;
      const type = await ProjectType.findById(typeId);
      if (!type) {
        return next(CustomErrorHandler.notFound('Type not found'));
      }
      return res.status(200).json(type);
    } catch (error) {
      return next(error);
    }
  },
}

module.exports = projectTypeController;