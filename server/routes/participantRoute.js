const express = require("express");
const router = express.Router();
const { addParticipant, deleteRegistrationForUser, getParticipantsList } = require("../controllers/participantController.js");

// GET /api/participants/export/:eventId
router.get("/export/:eventId", getParticipantsList);

// POST /api/participants/add
router.post("/add", addParticipant);

// DELETE /api/participants/:registrationId
router.delete("/:registrationId", deleteRegistrationForUser)

module.exports = router;