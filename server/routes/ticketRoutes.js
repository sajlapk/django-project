const express = require('express')
const router = express.Router();
const { issueTicket, deleteTicketForUser } = require('../controllers/ticketController')

// POST /api/tickets/issueTicket
router.post('/issueTicket', issueTicket);

// DELETE /api/tickets/:ticketId
router.delete('/:ticketId', deleteTicketForUser)

module.exports = router;