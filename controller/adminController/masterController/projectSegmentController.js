const ProjectSegment = require('../../../models/admin/master/projectSegment');
const masterSegmentSchema = require('../../../Validators/masterSegmentValidator');
const CustomErrorHandler = require('../../../services/CustomErrorHandler');
const projectSegmentController = {
  async storeSegment(req, res, next) {
    try {
      const { error } = masterSegmentSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const newSegment = new ProjectSegment({ ...req.body });
      const savedSegment = await newSegment.save();
      return res.status(200).json(savedSegment);
    } catch (error) {
      return next(error);
    }
  },

  async getAllSegments(req, res, next) {
    try {
      const allSegments = await ProjectSegment.find();
      return res.status(200).json(allSegments);
    } catch (error) {
      return next(error);
    }
  },

  async updateSegment(req, res, next) {
    try {
      const { error } = masterSegmentSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const segmentId = req.params.id;
      const updatedSegment = await ProjectSegment.findOneAndUpdate({ _id: segmentId }, { ...req.body }, { new: true })
      if (!updatedSegment) {
        return next(CustomErrorHandler.notFound('Segment not found'));
      }
      return res.status(200).json(updatedSegment);
    } catch (error) {
      return next(error);
    }
  },

  async deleteSegment(req, res, next) {
    try {
      const segmentId = req.params.id;
      const removedSegment = await ProjectSegment.findByIdAndDelete({ _id: segmentId });
      if (removedSegment)
        return res.status(200).json(removedSegment);
      return res.status(204).json(removedSegment);
    } catch (error) {
      return next(error);
    }
  },

  async getSegmentByID(req, res, next) {
    const segmentId = req.params.id;
    const segment = await ProjectSegment.findById(segmentId);
    if (!segment) {
      return next(CustomErrorHandler.notFound('Segment not found'));
    }
    return res.status(200).json(segment);
  },
}

module.exports = projectSegmentController;