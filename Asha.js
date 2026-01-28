const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AshaSchema = new mongoose.Schema({
  ashaId: { type: String, unique: true, required: true },
  name: String,
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

AshaSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
}

module.exports = mongoose.model('Asha', AshaSchema);
