const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Patient = require('../models/Patient');

router.get('/', auth, async (req, res) => {
  const patients = await Patient.find({ ashaId: req.asha.ashaId });
  res.json(patients);
});

router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    data.ashaId = req.asha.ashaId;
    data.updatedAt = new Date();
    const p = new Patient(data);
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
