const express = require("express");
const router = express();

const {
  addGoal,
  getGoalById,
  deleteGoalById,
  updateGoalById,
} = require("../controllers/goal");

const {
  addRecord,
  updateRecordById,
  deleteRecordById,
  getRecordById,
} = require(`../controllers/record`);

const { auth } = require("../middlewares/session");

// goal routes

router.post(`/`, addGoal); // add goal
router.put(`/:id`, auth, updateGoalById); // edit goal
router.delete(`/:id`, auth, deleteGoalById); // delete goal
router.get(`/:id`, getGoalById); // get goal info

// record routes

router.post(`/record`, addRecord); // add goal
router.put(`/record/:recordid`, auth, updateRecordById); // edit goal
router.delete(`/record/:recordid`, auth, deleteRecordById); // delete goal
router.get(`/record/:recordid`, getRecordById); // get goal info

module.exports = router;
