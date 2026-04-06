const express = require('express');
const {
  createRequest,
  listAll,
  removeOne,
  deleteManyByPetId
} = require('../Controller/adoptApiController');
const { authRequired, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request', authRequired, createRequest);
router.get('/all', authRequired, adminOnly, listAll);
router.delete('/many/:petId', authRequired, adminOnly, deleteManyByPetId);
router.delete('/:id', authRequired, adminOnly, removeOne);

module.exports = router;
