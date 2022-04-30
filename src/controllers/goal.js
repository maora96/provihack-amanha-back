const mongoose = require("mongoose");
const Goal = require("../models/goal");

const addGoal = async (req, res) => {
  const { resource, percentage, companyId } = req.body;

  const goalExists = await Goal.findOne({ resource });
  if (goalExists) {
    return res.status(500).send({
      message: "Resource already registered.",
    });
  }

  const newGoal = new Goal({
    resource,
    percentage,
    companyId,
  });

  try {
    await newGoal.save();
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Required content not fullfilled.",
    });
  }
  res.status(200).send({
    message: "Ok",
  });
};

const getGoalById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  const goal = await Goal.findById(id);
  res.status(200).send(goal);
};

const deleteGoalById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  await Goal.findByIdAndDelete(id);
  res.status(200).send({
    message: "Ok",
  });
};

const updateGoalById = async (req, res) => {
  const { resource, percentage, companyId } = req.body;

  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  try {
    await Goal.findByIdAndUpdate(id, resource, percentage, companyId);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Required content not fullfilled.",
    });
  }
  res.status(200).send({
    message: "Ok",
  });
};

module.exports = {
  addGoal,
  getGoalById,
  deleteGoalById,
  updateGoalById,
};
