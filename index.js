const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bikeRouter = require("./bike/bike.router");

dotenv.config();
// mongoose.set('debug', true);

const PORT = process.env.PORT || 8080;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_URL = `mongodb+srv://Admin:${MONGO_PASS}@cluster0.elolo.mongodb.net/bike`;

// 1. Start server
// 2. Init middlewares
// 3. Declare routes
// 4. Connect to database
// 5. Listen on port

start();

async function start() {
  const app = initServer();
  initMiddlewares(app);
  declareRoutes(app);
  await connectToDb();
  listen(app);
}

function initServer() {
  return express();
}

function initMiddlewares(app) {
  app.use(express.json());
}

function declareRoutes(app) {
  // app.use('/bikes', bikeRouter);
  app.use("/", bikeRouter);
}

async function connectToDb() {
  try {
    await mongoose.connect(MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

function listen(app) {
  app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
  });
}
