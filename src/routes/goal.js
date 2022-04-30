const express = require("express");
const router = express();

const {
  addGoal,
  getGoalById,
  deleteGoalById,
  updateGoalById,
} = require("../controllers/goal");

const { auth } = require("../middlewares/session");

// goal routes

router.post(`/`, addGoal); // add goal
router.put(`/`, auth, updateGoalById); // edit goal
router.delete(`/:id`, auth, deleteGoalById); // delete goal
router.get(`/:id`, getGoalById); // get goal info

module.exports = router;
