const express = require("express");
const router = express();

const {
  addCompany,
  getCompanyById,
  deleteCompanyById,
  updateCompanyById,
  signin,
} = require("../controllers/company");

const { auth } = require("../middlewares/session");

// company routes

router.post(`/`, addCompany); // add company
router.put(`/:id`, auth, updateCompanyById); // edit company
router.delete(`/:id`, auth, deleteCompanyById); // delete company
router.get(`/:id`, getCompanyById); // get company info
router.post(`/signin`, signin); // company login

module.exports = router;
