const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    paymentId: { type: String, required: true },
    name: { type: String },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number }
})

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;