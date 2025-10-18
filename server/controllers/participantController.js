const Participant = require('../models/participantModel');
const Event = require('../models/eventModel');
const { Parser } = require('json2csv'); 

// Logic for exporting participant list for an event as .csv file
const getParticipantsList = async (req, res) => {
    try{
        const { eventId } = req.params;

       // 1. Fetch all participant data from the database.
        // .lean() makes the query faster as it returns plain JavaScript objects.
        const participants = await Participant.find({ eventId: eventId }).lean();

        if (participants.length === 0) {
            return res.status(404).json({ message: 'No participants found to export.' });
        }

        // 2. Define the columns (fields) for your CSV file.
        // We can rename them using 'label' for better readability in the spreadsheet.
        const fields = [
            { label: 'Participant Name', value: 'name' },
            { label: 'Age', value: 'age' },
            { label: 'Height (cm)', value: 'height' },
            { label: 'Weight (kg)', value: 'weight' },
            { label: 'Gender', value: 'gender' },
            { label: 'Event ID', value: 'eventId' },
            { label: 'Payment ID', value: 'paymentId' },
            { label: 'User ID', value: 'userId' },
        ];

        // 3. Create a new CSV parser with the defined fields.
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(participants);

        // 4. Set the HTTP headers to tell the browser to download the file.
        const date = new Date().toISOString().slice(0, 10); // e.g., "2025-09-30"
        const filename = `participants-export-${date}.csv`;

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', `attachment; filename="${filename}"`);

        // 5. Send the CSV data as the response.
        res.status(200).send(csv);
    }catch(error){
        console.error("Error exporting participant list: ", error);
        res.status(500).json({ message: "Server error while exporting participant list." });
    }
}

// Logic for adding participants after participant has payed for registration
// For when participant details are needed
// const addParticipant = async (req, res) => {
//     try{
//         const { userId, eventId, paymentId, name, age, height, weight } = req.body;

//         if(!userId || !eventId || !paymentId || !name || !age || !height || !weight){
//             return res.status(400).json({ message: 'Please fill in all required fields' });
//         }

//         // Create the participant instance
//         const newParticipant = new Participant({
//             userId,
//             eventId,
//             paymentId,
//             name,
//             age: Number(age),
//             height: Number(height),
//             weight: Number(weight)
//         });

//         const savedParticipant = await newParticipant.save();

//         // Find corresponding event and add the new ticket's id to it's ticket array
//         const updateEvent = await  Event.findByIdAndUpdate(
//             eventId, // Match by event id
//             {
//                 $push: { participants: savedParticipant._id } // If found, push the reference to the array in event model
//             },
//             { new: true } // Return updated document
//         );

//         // Edge case handling
//         if(!updateEvent){
//             return res.status(404).json({ message: 'Event not found after queuing participant.' })
//         }

//         res.status(201).json(savedParticipant);
//     }catch(error){
//         console.error("Error adding participant: ", error);
//         res.status(500).json({ message: "Server error while adding participant" });
//     }
// };

const addParticipant = async (req, res) => {
    try{
        const { userId, eventId, paymentId, name } = req.body;

        if(!userId || !eventId || !paymentId || !name){
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        // Create the participant instance
        const newParticipant = new Participant({
            userId,
            eventId,
            paymentId,
            name
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
    deleteRegistrationForUser,
    getParticipantsList
};