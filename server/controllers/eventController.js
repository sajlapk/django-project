const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
  try {
    // Destructure all new fields from the request body
    const { 
      name, date, time, location, description, registration_fee, ticket_fee, image_url, 
      category, max_participants, judging_criteria, prize_sponsorship, 
      org_phone_no, org_email, social_media 
    } = req.body;

    if (!name || !date || !time || !location || !description || !registration_fee || !ticket_fee || !category || !max_participants) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const newEvent = new Event({
      name, date, time, location, description,
      registration_fee: Number(registration_fee),
      ticket_fee: Number(ticket_fee),
      image_url: image_url || '',
      category,
      max_participants: Number(max_participants),
      judging_criteria,
      prize_sponsorship,
      org_phone_no,
      org_email,
      social_media,
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