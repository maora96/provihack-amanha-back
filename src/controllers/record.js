const mongoose = require("mongoose");
const Goal = require("../models/goal");
const Record = require("../models/record");

const addRecord = async (req, res) => {
  const { year, month, cost, value } = req.body;
  const goalId = mongoose.Types.ObjectId(req.params.id);

  const goalExists = await Goal.findOne({ resource });
  if (!goalExists) {
    return res.status(500).send({
      message: "Goal doesn't exist.",
    });
  }

  const newRecord = new Record({
    year,
    month,
    cost,
    value,
  });

  try {
    await newRecord.save();
    // TODO: ADD TO GOAL
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

const getRecordById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  const record = await Record.findById(id);
  res.status(200).send(record);
};

const deleteRecordById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  await Record.findByIdAndDelete(id);
  res.status(200).send({
    message: "Ok",
  });
};

const updateRecordById = async (req, res) => {
  const { year, month, cost, value } = req.body;

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
    await Record.findByIdAndUpdate(year, month, cost, value);
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
  addRecord,
  updateRecordById,
  deleteRecordById,
  getRecordById,
};
