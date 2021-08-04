const Bike = require("./Bike");
const Joi = require("joi");

async function getBikes(req, res) {
  try {
    const bikes = await Bike.find();
    const statistics = await getStatistics();
    res.status(200).json({
      bikes,
      statistics,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function getStatistics() {
  const totalQuantityBikes = await Bike.find().countDocuments();
  const avialableBikesQuantity = await Bike.find({
    status: "Available",
  }).countDocuments();
  const busyBikesQuantity = await Bike.find({
    status: "Busy",
  }).countDocuments();

  const resultTotalPrice = await Bike.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$price",
        },
      },
    },
  ]);
  const averageCost = (resultTotalPrice[0].total / totalQuantityBikes).toFixed(2);
  return {
    totalQuantityBikes,
    avialableBikesQuantity,
    busyBikesQuantity,
    averageCost,
  };
}

async function createBike(req, res) {
  try {
    const bike = await Bike.create(req.body);
    const statistics = await getStatistics();
    res.status(200).json({
      bike,
      statistics,
    });
    // res.status(201).json(bike);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateBike(req, res) {
  try {
    const bike = await Bike.findByIdAndUpdate(
      req.body.id,
      { $set: { status: req.body.status } },
      {
        new: true,
      }
    );
    const statistics = await getStatistics();
    res.status(200).json({
      bike,
      statistics,
    });
    // res.status(201).json(bike);
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
    const statistics = await getStatistics();
    res.json({ bike, statistics });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

function validateData(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required().min(5),
    type: Joi.string().required().min(5),
    color: Joi.string().required().min(5),
    wheelSize: Joi.number().required(),
    price: Joi.number().required(),
    id: Joi.string().required().min(5),
    description: Joi.string().required().min(5),
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
