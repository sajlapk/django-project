const mongoose = require('mongoose');

const ticketsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  userId: { type: String, required: true},
  paymentId: { type: String, required: true },
  buyer_name: String,
  buyer_email: String,
  amount: Number,
  no_of_tickets: Number,
  // Status is not used as for now. This is for future scalability and can be helpful if refunds are planned in the pipeline.
  status: { 
    type: String,
    enum: [ "CONFIRMED", "CANCELLED", 'REFUNDED' ],
    default: "CONFIRMED"
  },
}, { timestamps: true });

const Tickets = mongoose.model('Tickets', ticketsSchema);

module.exports = Tickets;
