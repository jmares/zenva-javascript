require('dotenv').config();

//const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
const mongoose = require('mongoose');

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password');

// setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;
const mongoConfig = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

if (process.env.MONGO_USER_NAME && process.env.MONGO.PASSWORD) {
    mongoConfig.auth = { authSource: 'admin' };
    mongoConfig.user = process.env.MONGO_USER_NAME;
    mongoConfig.pass = process.env.MONGO.PASSWORD;
}
mongoose.connect(uri, mongoConfig);

mongoose.connection.on('error', (error) => {
    console.log(error);
    process.exit(1);
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
});

const app = express();
const port = process.env.PORT || 3000; 

// updating express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// require password auth
require('./auth/auth');

// setup routes

app.use('/', routes);
app.use('/', passwordRoutes);


// catch all other routes

app.use((request, response) => {
    response.status(404).json({ message: '404 - Not Found', status: 404});
});

// handle errors

app.use((error, request, response, next) => {
    console.log(error);
    response.status(error.status || 500).json({ error: error.message, status: error.status || 500});
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});