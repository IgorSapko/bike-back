const { Router } = require('express');
const BikeController = require('./bike.controller');

const router = Router();

router.get('/bikes', BikeController.getBikes);
router.post('/', BikeController.createBike);

module.exports = router;