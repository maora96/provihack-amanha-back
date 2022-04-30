const mongoose = require("mongoose");
const Record = require(`./record`);

const goalSchema = new mongoose.Schema({
  resource: { type: String, required: true },
  percentage: { type: Number, required: true },
  companyId: { type: String, required: true },
  record: [Record],
});

module.exports = mongoose.model("Goal", goalSchema);
