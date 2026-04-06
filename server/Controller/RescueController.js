const mongoose = require('mongoose');
const Rescue = require('../Model/RescueModel');

const submitRescue = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Pet image is required.' });
    }

    const { description, phone, emergencyType, lat, lng, manualAddress } =
      req.body;

    if (!description || !phone || !emergencyType) {
      return res.status(400).json({
        error: 'Description, contact number, and emergency type are required.'
      });
    }

    const payload = {
      filename: req.file.filename,
      description,
      phone,
      emergencyType,
      lat: lat || '',
      lng: lng || '',
      manualAddress: manualAddress || ''
    };

    if (mongoose.connection.readyState === 1) {
      await Rescue.create(payload);
    }

    res.status(200).json({
      ok: true,
      message: 'Our rescue team is reaching the pet location soon.'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { submitRescue };
