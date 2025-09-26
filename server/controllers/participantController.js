const Participant = require('../models/participantModel');
const Event = require('../models/eventModel');

// Logic for adding participants after participant has payed for registration
const addParticipant = async (req, res) => {
    try{
        const { userId, eventId, paymentId, name, age, height, weight } = req.body;

        if(!userId || !eventId || !paymentId || !name || !age || !height || !weight){
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        // Create the participant instance
        const newParticipant = new Participant({
            userId,
            eventId,
            paymentId,
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
        console.error("Error adding participant: ", error);
        res.status(500).json({ message: "Server error while adding participant" });
    }
};

// Logic for deleting participant on user request by registrationId
const deleteRegistrationForUser = async (req, res) => {
    try{
        const { registrationId } = req.params;

        // Find the participant document to get its eventId.
        const participant = await Participant.findById(registrationId);


        if (!participant) {
            return res.status(404).json({ message: 'Participant registration not found.' });
        }

        // Update the parent Event to remove the reference.

        // Use $pull to remove the participantId from the 'participants' array.
        await Event.findByIdAndUpdate(participant.eventId, {
            $pull: { participants: registrationId }
        });

        // 3. Delete the actual participant document.
        await Participant.findByIdAndDelete(registrationId);

        res.status(200).json({ message: 'Participant registration cancelled successfully.' });
    }catch(error){
        console.error("Error deleting participant: ", error);
        res.status(500).json({ message: "Server error while deleting participant."})
    }
};

module.exports = {
    addParticipant,
    deleteRegistrationForUser
};