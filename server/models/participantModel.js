const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number }
})

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;