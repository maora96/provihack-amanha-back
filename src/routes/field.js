const express = require("express");
const router = express();

const {
  addField,
  getFieldById,
  getAllFields,
} = require("../controllers/field");

const { auth } = require("../middlewares/session");

// field routes
router.post(`/`, addField); // add field
router.get(`/:id`, getFieldById); // get field info
router.get(`/`, getAllFields); // get all field

module.exports = router;
