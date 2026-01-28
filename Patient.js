const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  localId: String,
  name: { type: String, required: true },
  age: Number,
  gender: String,
  phone: String,
  address: String,
  ashaId: String,
  notes: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientSchema);
