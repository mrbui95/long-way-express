const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: { type: String, required: true },
  identity_number: { type: String, required: true, unique: true },
  license_number: { type: String, required: true, unique: true },
  license_type: { type: String, enum: ['B1', 'B2', 'C', 'D'], required: true },
  address: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  years_of_experience: { type: Number, required: true, min: 0 },
  monthly_salary: { type: Number, required: true }
});

module.exports = mongoose.model('Driver', driverSchema);
