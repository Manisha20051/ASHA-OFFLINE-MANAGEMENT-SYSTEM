const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Patient = require('../models/Patient');

router.post('/', auth, async (req, res) => {
  const { patients } = req.body;
  if (!Array.isArray(patients)) return res.status(400).json({ message: 'Bad payload' });

  const results = [];
  for (const p of patients) {
    if (p._id) {
      const existing = await Patient.findById(p._id);
      if (existing) {
        if (!existing.updatedAt || new Date(p.updatedAt) > new Date(existing.updatedAt)) {
          Object.assign(existing, p);
          existing.updatedAt = new Date(p.updatedAt || Date.now());
          await existing.save();
        }
        results.push(existing);
        continue;
      }
    }
    const newP = new Patient({ ...p, ashaId: req.asha.ashaId, updatedAt: new Date(p.updatedAt || Date.now()) });
    await newP.save();
    results.push(newP);
  }

  res.json({ synced: results });
});

module.exports = router;
