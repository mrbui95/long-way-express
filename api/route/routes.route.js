const express = require('express');
const routeRoutes = express.Router();

// Require Route model
let Route = require('../model/routes.model');

// Add new route
routeRoutes.route('/add').post((req, res) => {
    let route = new Route(req.body);
    route.save()
        .then(route => {
            res.status(200).json({ 'route': 'Route added successfully' });
        })
        .catch(err => {
            res.status(400).send('Unable to save route to the database');
        });
});

// Get all routes
routeRoutes.route('/').get((req, res) => {
    Route.find((err, routes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(routes);
        }
    });
});

// Get route by ID
routeRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Route.findById(id, (err, route) => {
        if (err) {
            res.status(404).send('Route not found');
        } else {
            res.json(route);
        }
    });
});

// Update route by ID
routeRoutes.route('/update/:id').post((req, res) => {
    Route.findById(req.params.id, (err, route) => {
        if (!route)
            res.status(404).send('Route not found');
        else {
            route.start_point = req.body.start_point;
            route.end_point = req.body.end_point;
            route.distance_km = req.body.distance_km;
            route.difficulty_level = req.body.difficulty_level;

            route.save()
                .then(() => res.json('Route updated successfully'))
                .catch(err => res.status(400).send('Unable to update route'));
        }
    });
});

// Delete route by ID
routeRoutes.route('/delete/:id').delete((req, res) => {
    Route.findByIdAndRemove(req.params.id, (err) => {
        if (err) res.json(err);
        else res.json('Route successfully removed');
    });
});

module.exports = routeRoutes;
