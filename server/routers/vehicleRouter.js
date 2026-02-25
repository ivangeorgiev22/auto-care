const router = require('express').Router();
const controller = require('../controllers/vehicleController.js');

router.get('/', controller.getVehicles);
router.get('/:id', controller.getVehicleById);
router.post('/', controller.addVehicle);
router.delete('/:id', controller.deleteVehicle);


module.exports = router;