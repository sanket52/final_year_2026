const mongoose = require('mongoose');

const emergencyReportSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: '' },
    coordinates: {
      lat: { type: String, default: '' },
      lng: { type: String, default: '' }
    },
    phone: { type: String, required: true },
    emergencyType: { type: String, default: 'other' },
    status: { type: String, default: 'received' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true, bufferCommands: false }
);

module.exports = mongoose.model('EmergencyReport', emergencyReportSchema);
