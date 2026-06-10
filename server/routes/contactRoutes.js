const express = require('express')
const router = express.Router();
const { sendMessage } = require('../controllers/contactController')

// POST /api/tickets/issueTicket
router.post('/sendMessage', sendMessage);

module.exports = router;