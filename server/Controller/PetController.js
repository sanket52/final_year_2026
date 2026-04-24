const mongoose = require('mongoose');
const Pet = require('../Model/PetModel');
const fs = require('fs');
const path = require('path');

const normalizePetStatus = (value) => {
  const status = String(value || '').trim().toLowerCase();
  if (status === 'approved') return 'Approved';
  if (status === 'adopted') return 'Adopted';
  if (status === 'rejected') return 'Rejected';
  return 'Pending';
};

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename,
      status: 'Pending',
      userId: req.user?.userId || null
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;
    const updates = {
      status: normalizePetStatus(status || 'Approved')
    };

    if (typeof email === 'string' && email.trim()) {
      updates.email = email.trim();
    }

    if (typeof phone === 'string' && phone.trim()) {
      updates.phone = phone.trim();
    }

    const pet = await Pet.findByIdAndUpdate(id, updates, { new: true });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = async (reqStatus, req, res) => {
  try {
    if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      return res.status(503).json({
        error: 'Database is not connected. Check mongooseURL in server/.env and that MongoDB is reachable.'
      });
    }
    const data = await Pet.find({
      status: { $regex: new RegExp(`^${reqStatus}$`, 'i') }
    })
      .sort({ updatedAt: -1 })
      .lean()
      .exec();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    const filePath = path.join(__dirname, '../images', pet.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByIdAndUpdate(id, { status: normalizePetStatus('Rejected') }, { new: true });
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets,
  rejectRequest
};
