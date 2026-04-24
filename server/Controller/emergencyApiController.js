const EmergencyReport = require('../Model/EmergencyReportModel');

const createReport = async (req, res) => {
  try {
    console.log('emergency report body', req.body);
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required.' });
    }
    const { description, phone, emergencyType, lat, lng, manualAddress } = req.body;
    if (!description || !phone) {
      return res.status(400).json({ error: 'Description and phone are required.' });
    }
    const doc = await EmergencyReport.create({
      image: req.file.filename,
      description,
      phone,
      emergencyType: emergencyType || 'other',
      location: manualAddress || '',
      coordinates: { lat: lat || '', lng: lng || '' },
      status: 'received',
      userId: req.user.userId
    });
    res.status(201).json({
      ok: true,
      message: 'Our rescue team is reaching the pet location soon.',
      id: doc._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const listAll = async (req, res) => {
  try {
    const rows = await EmergencyReport.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const nextStatus = String(status || '').toLowerCase();
    if (!['received', 'in-progress', 'resolved', 'rejected'].includes(nextStatus)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }
    const row = await EmergencyReport.findByIdAndUpdate(
      id,
      { status: nextStatus },
      { new: true }
    ).lean();
    if (!row) {
      return res.status(404).json({ error: 'Report not found.' });
    }
    res.status(200).json({ message: `Emergency report marked as ${nextStatus}.`, report: row });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReport, listAll, updateStatus };
