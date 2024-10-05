const express = require('express');
const mongoose = require('mongoose')
const tripRoutes = express.Router();

// Require Trip model
let Trip = require('../model/trips.model');

// Add new trip
tripRoutes.route('/add').post((req, res) => {
    let trip = new Trip(req.body);
    trip.save()
        .then(trip => {
            res.status(200).json({ 'trip': 'Trip added successfully' });
        })
        .catch(err => {
            console.error(err)
            res.status(400).send('Unable to save trip to the database');
        });
});

// Get all trips
tripRoutes.route('/').get((req, res) => {
    Trip.find((err, trips) => {
        if (err) {
            console.log(err);
        } else {
            res.json(trips);
        }
    });
});

// Get trip by ID
tripRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Trip.findById(id, (err, trip) => {
        if (err) {
            res.status(404).send('Trip not found');
        } else {
            res.json(trip);
        }
    });
});

// Update trip by ID
tripRoutes.route('/update/:id').post((req, res) => {
    Trip.findById(req.params.id, (err, trip) => {
        if (!trip)
            res.status(404).send('Trip not found');
        else {
            trip.trip_number = req.body.trip_number
            trip.route_id = mongoose.Types.ObjectId(req.body.route_id);
            trip.driver_id = mongoose.Types.ObjectId(req.body.driver_id);
            trip.assistant_driver_id = mongoose.Types.ObjectId(req.body.assistant_driver_id);
            trip.vehicle_id = mongoose.Types.ObjectId(req.body.vehicle_id);
            trip.passenger_count = req.body.passenger_count;
            trip.ticket_price = req.body.ticket_price;
            trip.trip_date = req.body.trip_date;

            trip.save()
                .then(() => res.json('Trip updated successfully'))
                .catch(err => {
                    console.error(err)
                    res.status(400).send('Unable to update trip')
                });
        }
    });
});

// Delete trip by ID
tripRoutes.route('/delete/:id').delete((req, res) => {
    Trip.findByIdAndRemove(req.params.id, (err) => {
        if (err) res.json(err);
        else res.json('Trip successfully removed');
    });
});

module.exports = tripRoutes;
