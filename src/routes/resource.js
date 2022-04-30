const express = require("express");
const router = express();

const {
  addResource,
  getResourceById,
  getAllResources,
} = require("../controllers/resource");

// resource routes

router.post(`/`, addResource); // add resource
router.get(`/:id`, getResourceById); // get resource info
router.get(`/`, getAllResources); // get all resources

module.exports = router;
