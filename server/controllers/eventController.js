const Event = require('../models/eventModel');
const Ticket = require('../models/ticketsModel');
const Participant = require('../models/participantModel');

// Logic to create a new event with all the additional fields
const createEvent = async (req, res) => {
  try {
    // Destructure all new fields from the request body
    const { 
      name, date, time, location, description, registration_fee, ticket_fee, total_tickets, banner_image_url, additional_images,
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
      banner_image_url: banner_image_url || 'https://res.cloudinary.com/dgfvk6ouy/image/upload/v1758466128/placeholder_banner_lwgiqn.png',
      additional_images: additional_images,
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

// Logic to fetch all events while also calculating available tickets for the event and the participant seats that are left
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

// Logic to update status of events from admin panel
const updateEventStatus = async (req, res) => {
  try {
      const { id } = req.params; // Get the event ID from the URL
      const { status } = req.body; // Get the new status from the request body

      // Validate the incoming status
      if (!status || !['ONGOING', 'PASSED'].includes(status)) {
          return res.status(400).json({ message: 'Invalid status provided.' });
      }

      const updatedEvent = await Event.findByIdAndUpdate(
          id,
          { status: status }, // The update to be made
          { new: true, runValidators: true } // Options: return the new version, run schema validators
      );

      if (!updatedEvent) {
          return res.status(404).json({ message: 'Event not found.' });
      }

      res.status(200).json(updatedEvent);

  } catch (error) {
      console.error("Error updating event status:", error);
      res.status(500).json({ message: "Server error while updating event status" });
  }
};

// Logic to delete an event and associated participant and tickets from respective collections from admin panel
const deleteEvent = async (req, res) => {
  try{
     const { id: eventId } = req.params;

    // 1. Find the event document BEFORE deleting it.
    // We need to access its 'tickets' and 'participants' arrays.
    const eventToDelete = await Event.findById(eventId);

    if (!eventToDelete) {
      return res.status(404).json({ message: "Event not found." });
    }

    // 2. Delete all associated Ticket documents.
    // The $in operator finds all documents where the _id is "in" the provided array.
    if (eventToDelete.tickets && eventToDelete.tickets.length > 0) {
      await Ticket.deleteMany({ _id: { $in: eventToDelete.tickets } });
    }

    // 3. Delete all associated Participant documents.
    if (eventToDelete.participants && eventToDelete.participants.length > 0) {
      await Participant.deleteMany({ _id: { $in: eventToDelete.participants } });
    }

    // 4. Finally, delete the Event document itself.
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event and all associated tickets and participants deleted successfully." });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error while deleting event" });
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  updateEventStatus,
  deleteEvent
};