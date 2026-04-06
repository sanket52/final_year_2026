const mongoose = require('mongoose');

const givePetSchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    petType: { type: String, required: true },
    breed: { type: String, default: '' },
    age: { type: String, required: true },
    gender: { type: String, default: '' },
    vaccinated: { type: String, default: '' },
    health: { type: String, default: '' },
    image: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    reason: { type: String, required: true },
    city: { type: String, default: '' },
    location: { type: String, default: '' },
    status: { type: String, default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true, bufferCommands: false }
);

module.exports = mongoose.model('GivePet', givePetSchema);
