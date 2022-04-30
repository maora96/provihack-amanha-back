const express = require("express");
const router = express();

const { getFieldById, getAllFields } = require("../controllers/field");

const { auth } = require("../middlewares/session");

// field routes
router.get(`/:id`, getFieldById); // get field info
router.get(`/`, getAllFields); // get goal info

module.exports = router;
