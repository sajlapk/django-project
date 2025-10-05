const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: { type: String},
  handle: { type: String},
});

const eventSchema = new mongoose.Schema({
  name: { type: String, default: 'Untitled Event' },
  date: { type: String, default: 'To be announced' },
  time: { type: String, default: 'To be announced' },
  location: { type: String, default: 'To be announced' },
  description: { type: String, default: 'No description provided.' },
  registration_fee: { type: Number, default: 1000 },
  ticket_fee: {type: Number, default: 500},
  total_tickets: { type: Number },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tickets' }],
  image_url: { type: String, default: 'https://res.cloudinary.com/dgfvk6ouy/image/upload/v1758466128/placeholder_banner_lwgiqn.png' },
  category: { type: String, default: 'General' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  max_participants: { type: Number, default: 50 },
  judging_criteria: { type: [String], default: ['Overall Physique'] },
  prize_sponsorship: { type: String, default: 'Not Sponsored' },
  org_phone_no: { type: String, default: 'Not Provided' },
  org_email: { type: String, default: 'Not Provided' },
  social_media: { type: [socialMediaSchema], default: [] },
  status: { type: String, enum: [ "ONGOING", "PASSED" ], default: "ONGOING" }
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;