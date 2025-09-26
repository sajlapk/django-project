const express = require("express");
const router = express.Router();
const { addParticipant, deleteRegistrationForUser } = require("../controllers/participantController.js");

// POST /api/participants/add
router.post("/add", addParticipant);

// DELETE /api/participants/:registrationId
router.delete("/:registrationId", deleteRegistrationForUser)

module.exports = router;