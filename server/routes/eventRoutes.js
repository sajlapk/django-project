const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, updateEventStatus, deleteEvent } = require('../controllers/eventController');

// GET /api/events
router.get('/', getAllEvents);

// POST /api/events/
router.post('/', createEvent);

// PATCH /api/events/:id
router.patch('/:id', updateEventStatus);

// DELETE /api/events/: id
router.delete('/:id', deleteEvent);


module.exports = router;