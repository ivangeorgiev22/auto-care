const router = require('express').Router();
const controller = require('../controllers/serviceController.js');

router.get('/', controller.getServices);
router.post('/', controller.addService);


module.exports= router;