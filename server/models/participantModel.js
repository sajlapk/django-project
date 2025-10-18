const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    paymentId: { type: String, required: true },
    name: { type: String },
    age: { type: Number, default: null },
    height: { type: Number, default: null },
    weight: { type: Number, default: null },
    gender: { type: String, enum: ['Male', 'Female'], default: null },
})

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;