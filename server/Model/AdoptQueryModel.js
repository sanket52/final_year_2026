const mongoose = require('mongoose');

const adoptQuerySchema = new mongoose.Schema(
  {
    petId: { type: String, required: true },
    userName: { type: String, default: '' },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, default: '' },
    message: { type: String, default: '' },
    livingSituation: { type: String, default: '' },
    previousExperience: { type: String, default: '' },
    familyComposition: { type: String, default: '' },
    status: { type: String, default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true, bufferCommands: false }
);

module.exports = mongoose.model('AdoptQuery', adoptQuerySchema);
