const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
  try {
    // Destructure all new fields from the request body
    const { 
      name, date, time, location, description, registration_fee, ticket_fee, total_tickets, image_url, 
      category, max_participants, judging_criteria, prize_sponsorship, 
      org_phone_no, org_email, social_media 
    } = req.body;

    if (!name || !date || !time || !location || !description || !registration_fee || !ticket_fee || !total_tickets || !category || !max_participants) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const newEvent = new Event({
      name, date, time, location, description,
      registration_fee: Number(registration_fee),
      ticket_fee: Number(ticket_fee),
      total_tickets: Number(total_tickets),
      image_url: image_url || 'https://res.cloudinary.com/dgfvk6ouy/image/upload/v1758466128/placeholder_banner_lwgiqn.png',
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
    
    // Compute the remaining number of tickets for event and return that along with all the event details
    const events = await Event.aggregate([
      {
        // Join everything from 'Events' instance with that of selected event
        $lookup: {
          from: 'tickets', // The name of the tickets collection in MongoDB
          localField: 'tickets', // The array of ObjectIDs in the 'events' collection
          foreignField: '_id', // The field to match in the 'tickets' collection
          as: 'ticket_details' // The name of the new array field to add the matched tickets to.
        }
      },
      // Adding a new field to each event for the count of issued tickets
      {
        $addFields: {
          issued_tickets_count: { $sum: { $ifNull: [ '$ticket_details.no_of_tickets', [] ] } }, // Calculate the total number of tickets issued by summing the 'no_of_tickets' value from each document inside the 'ticket_details' array.
          registered_participants_count: { $cond: { if: { $isArray: "$participants" }, then: { $size: "$participants" }, else: 0 }} // Calculate the number of registered participants by getting the size of the 'participants' array.
        },  
      },
      // Clean up the output by removing the large ticketDetails array
      {
        $project: {
          ticket_details: 0 // Excludes the ticketDetails field from the final output.A value of 0 means "exclude this field". We do this to keep the API response lean.
        }
      },
      // Sort the results (optional)
      {
        $sort: {
          createdAt: -1 // Sort by the 'createdAt' timestamp in descending order (newest events first).
        }
      }
    ]);

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