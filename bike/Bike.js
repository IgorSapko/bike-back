const mongoose = require("mongoose");
const { Schema } = mongoose;

const BikeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  wheelSize: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    default: "Available",
  },
});

// bikes
const Bike = mongoose.model("Bike", BikeSchema);

module.exports = Bike;
