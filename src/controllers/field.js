const mongoose = require("mongoose");
const Field = require("../models/field");

const addField = async (req, res) => {
  const { name } = req.body;

  const fieldExists = await Field.findOne({ name });
  if (fieldExists) {
    return res.status(500).send({
      message: "Name already registered.",
    });
  }

  const newField = new Field({
    name,
  });

  try {
    await newField.save();
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

const getFieldById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  const field = await Field.findById(id);
  res.status(200).send(field);
};

const getAllFields = async (req, res) => {
  const fields = await Field.find({});
  res.status(200).send(fields);
};

module.exports = {
  addField,
  getFieldById,
  getAllFields,
};
