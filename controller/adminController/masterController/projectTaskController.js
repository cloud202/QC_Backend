const ProjectTask = require("../../../models/admin/master/projectTask");
const masterSolutionSchema = require("../../../Validators/masterTaskValidator");
const CustomErrorHandler = require("../../../services/CustomErrorHandler");

const projectTaskController = {
  async storeTask(req, res, next) {
    try {
      const { error } = masterSolutionSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const newTask = new ProjectTask({ ...req.body });
      const savedtask = await newTask.save();
      return res.status(201).json(savedtask);
    } catch (error) {
      return next(error);
    }
  },

  async getAllTasks(req, res, next) {
    try {
      const allTasks = await ProjectTask.find();
      return res.status(200).json(allTasks);
    } catch (error) {
      return next(error);
    }
  },

  async getTaskById(req, res, next) {
    try {
      const taskId = req.params.id;
      const task = await ProjectTask.findById(taskId);
      if (!task) {
        return next(CustomErrorHandler.notFound('Task not found'));
      }
      return res.status(200).json(task);
    } catch (error) {
      return next(error);
    }
  },

  async updateTask(req, res, next) {
    try {
      const { error } = masterSolutionSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      const taskId = req.params.id;
      const updatedTask = await ProjectTask.findOneAndUpdate({ _id: taskId }, { ...req.body }, { new: true });
      if (!updatedTask) {
        return next(CustomErrorHandler.notFound('Task not found'));
      }
      return res.status(200).json(updatedTask);
    } catch (error) {
      return next(error);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const taskId = req.params.id;
      const removedtask = await ProjectTask.findByIdAndDelete({ _id: taskId });
      if (removedtask)
        return res.status(200).json(removedtask);
      return res.status(204).json(removedtask);
    } catch (error) {
      return next(error);
    }
  }
};



module.exports = projectTaskController;
