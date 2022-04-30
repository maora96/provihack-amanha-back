const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  employees: { type: Number, required: true },
  email: { type: String, required: true },
  area: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Company", companySchema);
