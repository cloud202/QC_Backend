const ProjectPhase = require('../../../models/admin/master/projectPhase');
const masterPhaseSchema = require('../../../Validators/masterPhaseValidator');
const CustomErrorHandler = require('../../../services/CustomErrorHandler');

const projectPhasecontroller = {
  async storePhase(req, res, next) {
    try {
      const { error } = masterPhaseSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const newPhase = new ProjectPhase({ ...req.body });
      const savedPhase = await newPhase.save();
      return res.status(200).json(savedPhase);
    } catch (error) {
      return next(error);
    }
  },

  async getAllPhases(req, res, next) {
    try {
      const allPhases = await ProjectPhase.find();
      return res.status(200).json(allPhases);
    } catch (error) {
      return next(error);
    }
  },

  async updatePhase(req, res, next) {
    try {
      const { error } = masterPhaseSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const phaseId = req.params.id;
      const updatedPhase = await ProjectPhase.findOneAndUpdate({ _id: phaseId }, { ...req.body }, { new: true })
      if (!updatedPhase) {
        return next(CustomErrorHandler.notFound('Phase not found'));
      }
      return res.status(200).json(updatedPhase);
    } catch (error) {
      return next(error);
    }
  },

  async deletePhase(req, res, next) {
    try {
      const phaseId = req.params.id;
      const removedPhase = await ProjectPhase.findByIdAndDelete({ _id: phaseId });
      if (removedPhase)
        return res.status(200).json(removedPhase);
      return res.status(204).json(removedPhase);
    } catch (error) {
      return next(error);
    }
  },

  async getPhaseByID(req, res, next) {
    const phaseId = req.params.id;
    const phase = await ProjectPhase.findById(phaseId);
    if (!phase) {
      return next(CustomErrorHandler.notFound('Phase not found'));
    }
    return res.status(200).json(phase);
  },
}

module.exports = projectPhasecontroller;
