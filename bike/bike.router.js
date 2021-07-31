const { Router } = require('express');
const BikeController = require('./bike.controller');

const router = Router();

router.get('/', BikeController.getBikes);
router.post('/', BikeController.createBike);

module.exports = router;