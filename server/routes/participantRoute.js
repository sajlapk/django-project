const express = require("express");
const router = express.Router();
const { addParticipant } = require("../controllers/participantController.js");

// POST /api/participants/add
router.post("/add", addParticipant);

module.exports = router;