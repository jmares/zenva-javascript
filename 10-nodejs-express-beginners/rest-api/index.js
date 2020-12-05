const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password');

// updating express settings
app.use(bodyParser.urlencoded({ extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

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