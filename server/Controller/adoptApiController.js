const AdoptQuery = require('../Model/AdoptQueryModel');

const createRequest = async (req, res) => {
  try {
    console.log('adopt request body', req.body);
    const {
      petId,
      email,
      phoneNo,
      livingSituation,
      previousExperience,
      familyComposition,
      userName,
      address,
      message
    } = req.body;

    if (!petId || !email || !phoneNo) {
      return res.status(400).json({ error: 'petId, email, and phone are required.' });
    }

    const doc = await AdoptQuery.create({
      petId,
      email,
      phoneNo,
      livingSituation: livingSituation || '',
      previousExperience: previousExperience || '',
      familyComposition: familyComposition || '',
      userName: userName || '',
      address: address || '',
      message: message || '',
      status: 'pending',
      userId: req.user.userId
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const listAll = async (req, res) => {
  try {
    const rows = await AdoptQuery.find().sort({ createdAt: -1 });
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeOne = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await AdoptQuery.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteManyByPetId = async (req, res) => {
  try {
    const { petId } = req.params;
    const result = await AdoptQuery.deleteMany({ petId });
    res.status(200).json({ message: 'Deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const nextStatus = String(status || '').toLowerCase();
    if (!['pending', 'approved', 'rejected'].includes(nextStatus)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const doc = await AdoptQuery.findByIdAndUpdate(
      id,
      { status: nextStatus },
      { new: true }
    );
    if (!doc) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json({ message: `Adoption request marked as ${nextStatus}.`, request: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await AdoptQuery.findById(id);
    if (!doc) {
      return res.status(404).json({ error: 'Not found' });
    }

    await AdoptQuery.updateMany(
      { petId: doc.petId, _id: { $ne: doc._id } },
      { status: 'rejected' }
    );

    doc.status = 'approved';
    await doc.save();

    res.status(200).json({ message: 'Adoption request approved.', request: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRequest, listAll, removeOne, deleteManyByPetId, updateStatus, approveRequest };
