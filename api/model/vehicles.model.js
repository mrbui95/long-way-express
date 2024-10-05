const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    plate_number: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    seat_count: { type: Number, required: true },
    manufacture_year: { type: Number, required: true },
    last_maintenance_date: { type: Date, required: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);