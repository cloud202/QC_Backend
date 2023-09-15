const ProjectIndustry = require('../../../models/admin/master/projectIndustry');
const masterIndustrySchema = require('../../../Validators/masterIndustryValidator');
const CustomErrorHandler = require('../../../services/CustomErrorHandler');
const projectIndustryController = {
  async storeIndustry(req, res, next) {
    try {
      const { error } = masterIndustrySchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const newIndustry = new ProjectIndustry({ ...req.body });
      const savedIndustry = await newIndustry.save();
      return res.status(200).json(savedIndustry);
    } catch (error) {
      return next(error);
    }
  },

  async getAllIndustries(req, res, next) {
    try {
      const allIndustries = await ProjectIndustry.find();
      return res.status(200).json(allIndustries);
    } catch (error) {
      return next(error);
    }
  },

  async updateIndustry(req, res, next) {
    try {
      const { error } = masterIndustrySchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const industryId = req.params.id;
      const updatedIndustry = await ProjectIndustry.findOneAndUpdate({ _id: industryId }, { ...req.body }, { new: true })
      if (!updatedIndustry) {
        return next(CustomErrorHandler.notFound('Industry not found'));
      }
      return res.status(200).json(updatedIndustry);
    } catch (error) {
      return next(error);
    }
  },

  async deleteIndustry(req, res, next) {
    try {
      const industryId = req.params.id;
      const removedIndustry = await ProjectIndustry.findByIdAndDelete({ _id: industryId });
      if (removedIndustry)
        return res.status(200).json(removedIndustry);
      return res.status(204).json(removedIndustry);
    } catch (error) {
      return next(error);
    }
  },

  async getIndustryByID(req, res, next) {
    try {
      const industryId = req.params.id;
      const industry = await ProjectIndustry.findById(industryId);
      if (!industry) {
        return next(CustomErrorHandler.notFound('Industry not found'));
      }
      return res.status(200).json(industry);  
    } catch (error) {
      return next(error);
    }
  },
}

module.exports = projectIndustryController;
