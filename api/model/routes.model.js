const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  start_point: { type: String, required: true },
  end_point: { type: String, required: true },
  distance_km: { type: Number, required: true },
  difficulty_level: { type: Number, enum: [1, 2, 3], required: true },
});

module.exports = mongoose.model('Route', routeSchema);
