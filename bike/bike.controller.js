const Bike = require("./Bike");

async function getBikes(req, res) {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createBike(req, res) {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateBike(req, res) {
  try {
    console.log(req.body);
    const bike = await Bike.findByIdAndUpdate(
      req.body.id,
      { $set: { status: req.body.status } },
      {
        new: true,
      }
    );
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteBike(req, res) {
  try {
    console.log("req.body.id", req.body.id);
    const bike = await Bike.findByIdAndDelete(req.body.id);

    if (!bike) {
      return res.status(404).send("Bike is not found", 'req.body.id', req.body.id, 'req.body', req.body);
    }
    res.json(bike);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getBikes,
  createBike,
  deleteBike,
  updateBike,
};
