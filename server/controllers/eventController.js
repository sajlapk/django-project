const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
  try {
    // Destructure all new fields from the request body
    const { 
      name, date, time, location, description, fee, imageUrl, 
      category, maxParticipants, judgingCriteria, prize_sponsorship, 
      org_phone_no, org_email, socialMedia 
    } = req.body;

    if (!name || !date || !time || !location || !description || !fee || !category || !maxParticipants) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const newEvent = new Event({
      name, date, time, location, description,
      fee: Number(fee),
      imageUrl: imageUrl || '',
      category,
      maxParticipants: Number(maxParticipants),
      judgingCriteria,
      prize_sponsorship,
      org_phone_no,
      org_email,
      socialMedia,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);

  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error while creating event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error while fetching events" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};