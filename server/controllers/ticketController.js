const Ticket = require('../models/ticketsModel');
const Event = require('../models/eventModel')

// Logic for issuing ticket after user payed for an event ticket
const issueTicket = async (req, res) => {
    try{
        const { eventId, paymentId, buyer_name,  buyer_email, amount, no_of_tickets } = req.body;

        if( !eventId || !paymentId || !buyer_name || !buyer_email || !amount || !no_of_tickets){
            return res.status(400).json({ message: 'Missing required ticket information.' });
        }

        // Create the ticket instance
        const newTicket = new Ticket({
            eventId,
            paymentId,
            buyer_name,
            buyer_email,
            amount: amount / 100, // Convert to rupees before storing
            no_of_tickets: no_of_tickets 
        });

        const savedTicket = await newTicket.save();

        // Find corresponding event and add the new ticket's id to it's ticket array
        const updateEvent = await Event.findByIdAndUpdate(
            eventId, 
            {
                $push: { tickets: savedTicket._id }
            },
            { new: true } // Return updated document
        )

        // Edge case handling
        if(!updateEvent){
            return res.status(404).json({ message: 'Event not found after creating ticket.' })
        }
        
        // If everything went successful
        res.status(201).json({ message: 'Ticket issued successfully!', ticket: savedTicket });
    }catch(error){
        console.error("Error issuing ticket:", error);
        res.status(500).json({ message: "Server error while issuing ticket" });
    }
}

module.exports = {
  issueTicket,
};