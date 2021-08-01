const Bike = require("./Bike");

async function getBikes(req, res) {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createBike(req, res) {
  try {
    const bike = await Bike.create(req.body);
    // res.json(bike);
    res.json(getBikes());
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteBike(req, res) {
  try {
    const {
        params: { id },
    } = req;

    const bike = await User.findByIdAndDelete(id);

    if (!bike) {
        return res.status(404).send('Bike is not found');
    }
    // res.json(bike);
    res.json(getBikes());
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getBikes,
  createBike,
  deleteBike,
};
