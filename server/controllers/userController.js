const Ticket = require("../models/ticketsModel");
const Participant = require("../models/participantModel");

const getUserProfileData = async (req, res) => {
    try{
        // Destructure the params that comes in the GET method
        const { userId } = req.params;

        // If user ID is not received
        if(!userId)
            return res.status(400).json({ message: "User ID is required." });
        
        // Find all tickets for this user and populate the event details
        const tickets =  await Ticket.find({ userId: userId })
            .populate('eventId') // Replaces eventId with the full Event document
            .sort({ createdAt: -1 }); // Sort by created timestamp

        // Find all participation registrations for this user
        const registrations = await Participant.find({ userId: userId })
            .populate('eventId')
            .sort({ createdAt: -1 });

        res.status(200).json({ tickets, registrations });

    }catch(error){
        console.error("Error fetching user profile data.", error);
        res.status(500).json({ message: "Server error while fetching profile data." });
    }
};

module.exports = { getUserProfileData }