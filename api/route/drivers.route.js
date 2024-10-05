const express = require('express');
const driverRoutes = express.Router();

// Require Driver model
let Driver = require('../model/drivers.model');

// Add new driver
driverRoutes.route('/add').post((req, res) => {
    let driver = new Driver(req.body);
    driver.save()
        .then(driver => {
            res.status(200).json({ 'driver': 'Driver added successfully' });
        })
        .catch(err => {
            res.status(400).send('Unable to save driver to the database');
        });
});

// Get all drivers
driverRoutes.route('/').get((req, res) => {
    Driver.find((err, drivers) => {
        if (err) {
            console.log(err);
        } else {
            res.json(drivers);
        }
    });
});

// Get driver by ID
driverRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Driver.findById(id, (err, driver) => {
        if (err) {
            res.status(404).send('Driver not found');
        } else {
            res.json(driver);
        }
    });
});

// Update driver by ID
driverRoutes.route('/update/:id').post((req, res) => {
    Driver.findById(req.params.id, (err, driver) => {
        if (!driver)
            res.status(404).send('Driver not found');
        else {
            driver.name = req.body.name;
            driver.identity_number = req.body.identity_number;
            driver.license_number = req.body.license_number;
            driver.license_type = req.body.license_type;
            driver.address = req.body.address;
            driver.date_of_birth = req.body.date_of_birth;
            driver.years_of_experience = req.body.years_of_experience;
            driver.monthly_salary = req.body.monthly_salary;

            driver.save()
                .then(() => res.json('Driver updated successfully'))
                .catch(err => res.status(400).send('Unable to update driver'));
        }
    });
});

// Delete driver by ID
driverRoutes.route('/delete/:id').delete((req, res) => {
    Driver.findByIdAndRemove(req.params.id, (err) => {
        if (err) res.json(err);
        else res.json('Driver successfully removed');
    });
});

module.exports = driverRoutes;
