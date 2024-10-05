const express = require('express');
const vehicleRoutes = express.Router();

// Require Vehicle model
let Vehicle = require('../model/vehicles.model');

// Add new vehicle
vehicleRoutes.route('/add').post((req, res) => {
    let vehicle = new Vehicle(req.body);
    vehicle.save()
        .then(vehicle => {
            res.status(200).json({ 'vehicle': 'Vehicle added successfully' });
        })
        .catch(err => {
            res.status(400).send('Unable to save vehicle to the database');
        });
});

// Get all vehicles
vehicleRoutes.route('/').get((req, res) => {
    Vehicle.find((err, vehicles) => {
        if (err) {
            console.log(err);
        } else {
            res.json(vehicles);
        }
    });
});

// Get vehicle by ID
vehicleRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Vehicle.findById(id, (err, vehicle) => {
        if (err) {
            res.status(404).send('Vehicle not found');
        } else {
            res.json(vehicle);
        }
    });
});

// Update vehicle by ID
vehicleRoutes.route('/update/:id').post((req, res) => {
    Vehicle.findById(req.params.id, (err, vehicle) => {
        if (!vehicle)
            res.status(404).send('Vehicle not found');
        else {
            vehicle.plate_number = req.body.plate_number;
            vehicle.color = req.body.color;
            vehicle.manufacturer = req.body.manufacturer;
            vehicle.model = req.body.model;
            vehicle.seat_count = req.body.seat_count;
            vehicle.manufacture_year = req.body.manufacture_year;
            vehicle.last_maintenance_date = req.body.last_maintenance_date;

            vehicle.save()
                .then(() => res.json('Vehicle updated successfully'))
                .catch(err => res.status(400).send('Unable to update vehicle'));
        }
    });
});

// Delete vehicle by ID
vehicleRoutes.route('/delete/:id').delete((req, res) => {
    Vehicle.findByIdAndRemove(req.params.id, (err) => {
        if (err) res.json(err);
        else res.json('Vehicle successfully removed');
    });
});

module.exports = vehicleRoutes;
