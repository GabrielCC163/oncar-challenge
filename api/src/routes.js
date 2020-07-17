const express = require('express');

const VehicleController = require('./controllers/VehicleController');

const routes = express.Router();

routes.get('/', VehicleController.index);
routes.get('/:id', VehicleController.show);
routes.post('/', VehicleController.create);
routes.put('/:id', VehicleController.update);
routes.delete('/:id', VehicleController.delete);

module.exports = routes;
