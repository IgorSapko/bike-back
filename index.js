const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bikeRouter = require('./bike/bike.router');

dotenv.config();
// mongoose.set('debug', true);

// const PORT = process.env.PORT || 8080;
const PORT = 8080;

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
    app.use('/', bikeRouter);
}

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
   
}

function listen(app) {
    app.listen(PORT, () => {
        console.log('Server is listening on port: ', PORT);
    });
}