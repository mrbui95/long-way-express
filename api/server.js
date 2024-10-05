// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const tripRoutes = require('./route/trips.route');
const routeRoutes = require('./route/routes.route');
const vehicleRoutes = require('./route/vehicles.route');
const driverRoutes = require('./route/drivers.route');

const dbConnect = require('./DB.js');

dbConnect()

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/trips', tripRoutes);
app.use('/routes', routeRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/drivers', driverRoutes);


app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});