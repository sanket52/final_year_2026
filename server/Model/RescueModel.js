const mongoose = require('mongoose');

const rescueSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    emergencyType: { type: String, required: true },
    lat: { type: String, default: '' },
    lng: { type: String, default: '' },
    manualAddress: { type: String, default: '' }
  },
  { timestamps: true, bufferCommands: false }
);

module.exports = mongoose.model('RescueReport', rescueSchema);
