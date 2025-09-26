const Participant = require('../models/participantModel');
const Event = require('../models/eventModel')

// Logic for adding participants after participant has payed for registration
const addParticipant = async (req, res) => {
    try{
        const { eventId, name, age, height, weight } = req.body;

        if(!eventId || !name || !age || !height || !weight){
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        // Create the participant instance
        const newParticipant = new Participant({
            name,
            age: Number(age),
            height: Number(height),
            weight: Number(weight)
        });

        const savedParticipant = await newParticipant.save();

        // Find corresponding event and add the new ticket's id to it's ticket array
        const updateEvent = await  Event.findByIdAndUpdate(
            eventId, // Match by event id
            {
                $push: { participants: savedParticipant._id } // If found, push the reference to the array in event model
            },
            { new: true } // Return updated document
        );

        // Edge case handling
        if(!updateEvent){
            return res.status(404).json({ message: 'Event not found after queuing participant.' })
        }

        res.status(201).json(savedParticipant);
    }catch(error){
        console.error("Error adding participant:", error);
        res.status(500).json({ message: "Server error while adding participant" });
    }
};

module.exports = {
    addParticipant
};