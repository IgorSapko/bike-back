const Bike = require('./Bike');

async function getBikes(req, res) {
    const bikes = await Bike.find();
    res.json(bikes);
}

async function createBike(req, res) {
    try {
        const bike = await Bike.create(req.body);
        res.json(bike);
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = {
    getBikes,
    createBike,
};