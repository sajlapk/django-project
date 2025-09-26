const mongoose = require('mongoose');

const ticketsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  paymentId: { type: String, required: true },
  buyer_name: String,
  buyer_email: String,
  amount: Number,
  no_of_tickets: Number,
  status: { 
    type: String,
    enum: [ "CONFIRMED", "CANCELLED", 'REFUNDED' ],
    default: "CONFIRMED"
  },
}, { timestamps: true });

const Tickets = mongoose.model('Tickets', ticketsSchema);

module.exports = Tickets;
