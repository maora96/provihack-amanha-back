const mongoose = require("mongoose");
const Resource = require("../models/resource");

const addResource = async (req, res) => {
  const { name } = req.body;

  const resourceExists = await Resource.findOne({ name });
  if (resourceExists) {
    return res.status(500).send({
      message: "Name already registered.",
    });
  }

  const newResource = new Resource({
    name,
  });

  try {
    await newResource.save();
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

const getResourceById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  const resource = await Resource.findById(id);
  res.status(200).send(resource);
};

const getAllResources = async (req, res) => {
  const resources = await Resource.find({});
  res.status(200).send(resources);
};

module.exports = {
  addResource,
  getResourceById,
  getAllResources,
};
