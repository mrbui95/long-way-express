const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  trip_number: { type: String, required: false },
  route_id: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
  driver_id: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  assistant_driver_id: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  vehicle_id: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  passenger_count: { type: Number, required: true, min: 0 },
  ticket_price: { type: Number, required: true },
  trip_date: { type: Date, required: true },
});

module.exports = mongoose.model('Trip', tripSchema);
