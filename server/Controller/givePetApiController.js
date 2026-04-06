const GivePet = require('../Model/GivePetModel');

const createGivePet = async (req, res) => {
  try {
    console.log('give-pet body', req.body);
    if (!req.file) {
      return res.status(400).json({ error: 'Pet image is required.' });
    }
    const {
      petName,
      petType,
      breed,
      age,
      gender,
      vaccinated,
      health,
      ownerName,
      phone,
      address,
      reason,
      city,
      location
    } = req.body;

    if (!petName || !petType || !age || !ownerName || !phone || !reason) {
      return res.status(400).json({
        error: 'Missing required fields (pet name, type, age, owner, phone, reason).'
      });
    }

    const doc = await GivePet.create({
      petName,
      petType,
      breed: breed || '',
      age,
      gender: gender || '',
      vaccinated: vaccinated || '',
      health: health || '',
      image: req.file.filename,
      ownerName,
      phone,
      address: address || '',
      reason,
      city: city || '',
      location: location || '',
      userId: req.user.userId
    });

    res.status(201).json({ message: 'Submission received. Our team will contact you soon.', id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const listAll = async (req, res) => {
  try {
    const rows = await GivePet.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createGivePet, listAll };
