const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  year: { type: String, required: true },
  month: { type: Number, required: true },
  cost: { type: String, required: true },
  value: { type: Number, required: true },
  goalId: { type: ObjectId, required: true },
  companyId: { type: ObjectId, required: true },
});

module.exports = mongoose.model("Record", recordSchema);
