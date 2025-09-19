const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  handle: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  fee: { type: Number, required: true },
  imageUrl: { type: String },
  category: { type: String, required: true, default: 'General' },
  participants: { type: Number, default: 0 },
  maxParticipants: { type: Number, default: 50 },
  judgingCriteria: { type: [String], default: [] },
  prize_sponsorship: { type: String },
  org_phone_no: { type: String },
  org_email: { type: String },
  socialMedia: { type: [socialMediaSchema], default: [] },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;