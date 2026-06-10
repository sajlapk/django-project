const Ticket = require('../models/ticketsModel');
const Event = require('../models/eventModel');
// const { processRefund } = require('../utils/refundHelper');

// Logic for issuing ticket after user payed for an event ticket
const issueTicket = async (req, res) => {
    try{
        const { eventId, paymentId, userId, buyer_name,  buyer_email, amount, no_of_tickets } = req.body;

        if( !eventId || !paymentId || !userId || !buyer_name || !buyer_email || !amount || !no_of_tickets){
            return res.status(400).json({ message: 'Missing required ticket information.' });
        }

        // Create the ticket instance
        const newTicket = new Ticket({
            eventId,
            userId,
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
        console.error("Error issuing ticket: ", error);
        res.status(500).json({ message: "Server error while issuing ticket." });
    }
}


// Logic for cancelling ticket for a specific user by ticketId
const deleteTicketForUser = async (req, res) => {
    try{
        const { ticketId } = req.params;

        // Find the ticket document BEFORE deleting it to get its eventId.
        const ticket = await Ticket.findById(ticketId);
        
        if(!ticket){
            return res.status(404).json({ message: "Ticket not found." });
        }

        // // Attempt refund before deletion
        // const refund = await processRefund(ticket.paymentId, ticket.amount);

        // // Mark ticket as refunded before deletion (for audit)
        // ticket.status = "REFUNDED";
        // await ticket.save();

        // Update the parent Event to remove the reference.
        // Use the $pull operator to remove the ticketId from the 'tickets' array.
        await Event.findByIdAndUpdate(ticket.eventId, {
            $pull: { tickets: ticketId }
        });

        // Now, delete the actual ticket document.
        await Ticket.findByIdAndDelete(ticketId);

        res.status(200).json({ message: 'Ticket cancelled successfully.', refund });
    }catch(error){
        console.error("Error deleting ticket: ", error);
        res.status(500).json({ message: "Server error while deleting ticket." });
    }
};

module.exports = {
  issueTicket,
  deleteTicketForUser
};