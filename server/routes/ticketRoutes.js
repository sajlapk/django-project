const express = require('express')
const router = express.Router();
const { issueTicket } = require('../controllers/ticketController')

// POST /api/tickets/issueTicket
router.post('/issueTicket', issueTicket);

module.exports = router;