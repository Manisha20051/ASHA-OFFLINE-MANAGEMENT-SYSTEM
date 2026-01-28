const express = require('express');
const router = express.Router();
const Asha = require('../models/Asha');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { ashaId, name, password } = req.body;
    if (!ashaId || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await Asha.findOne({ ashaId });
    if (existing) return res.status(400).json({ message: 'ASHA ID already exists' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const a = new Asha({ ashaId, name, passwordHash: hash });
    await a.save();
    res.json({ message: 'Registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { ashaId, password } = req.body;
    const a = await Asha.findOne({ ashaId });
    if (!a) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await a.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ ashaId: a.ashaId, name: a.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
