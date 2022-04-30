const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Password = require("../utils/password");
const Company = require("../models/company");

const addCompany = async (req, res) => {
  const { name, cnpj, employees, email, area, password } = req.body;

  if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
    return res.status(500).send({
      message: "Email not valid.",
    });
  }

  const companyExists = await Company.findOne({ email });
  if (companyExists) {
    return res.status(500).send({
      message: "Email already registered.",
    });
  }

  // encrypt password

  const hashedPassword = await Password.encrypt(password);

  const newCompany = new Company({
    name,
    cnpj,
    employees,
    email,
    area,
    password: hashedPassword,
  });

  try {
    await newCompany.save();
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

const getCompanyById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  const company = await Company.findById(id);
  res.status(200).send(company);
};

const deleteCompanyById = async (req, res) => {
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).send({
      error,
      message: "Provided id is not valid.",
    });
  }
  await Company.findByIdAndDelete(id);
  res.status(200).send({
    message: "Ok",
  });
};

const updateCompanyById = async (req, res) => {
  const { name, cnpj, employees, email, area, password } = req.body;

  if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(req.body.email)) {
    return res.status(500).send({
      message: "Email not valid.",
    });
  }
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
    await Company.findByIdAndUpdate(
      name,
      cnpj,
      employees,
      email,
      area,
      password
    );
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

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const companyExists = await Company.findOne({ email });
    if (!companyExists) {
      return res.status(404).json({ message: "Empresa não existe." });
    }

    const isPasswordCorrect = Password.check(password, companyExists.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Credenciais inválidos." });
    }

    const token = jwt.sign(
      {
        email: companyExists.email,
        id: companyExists.id,
      },
      "provihack",
      { expiresIn: "1h" }
    );

    res.status(200).json({ companyExists, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCompany,
  getCompanyById,
  deleteCompanyById,
  updateCompanyById,
  signin,
};
