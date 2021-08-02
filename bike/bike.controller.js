const Bike = require("./Bike");
const Joi = require("joi");

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
    const bike = await Bike.findByIdAndDelete(req.body.id);
    if (!bike) {
      return res.status(404).send("Bike is not found");
    }
    res.json(bike);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

function validateData(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    color: Joi.string().required(),
    wheelSize: Joi.number().required(),
    price: Joi.number().required(),
    id: Joi.string().required(),
    description: Joi.string().required(),
  });
  const validationResult = validationRules.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
}

async function checkUniqueId(req, res, next) {
  const bikes = await Bike.find();
  if (bikes.find((bike) => bike.id === req.body.id)) {
    return res.status(400).send("ID field should be unique");
  }
  next();
}

module.exports = {
  getBikes,
  createBike,
  deleteBike,
  updateBike,
  validateData,
  checkUniqueId,
};
