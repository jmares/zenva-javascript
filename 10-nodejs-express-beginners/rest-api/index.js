const { response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// updating express settings
app.use(bodyParser.urlencoded({ extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.get('/', (request, response) => {
    response.send('Hello world');
});

app.get('/status', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
});

app.post('/signup', (request, response, next) => {
    console.log(request.body);
    if (!request.body) {
        response.status(400).json({ message: 'invalid body', status: 400});
    } else {
        response.status(200).json({ message: 'ok', status: 200});
    }
});

app.post('/login', (request, response) => {
    console.log(request.body);
    if (!request.body) {
        response.status(400).json({ message: 'invalid body', status: 400});
    } else {
        response.status(200).json({ message: 'ok', status: 200});
    }
});

app.post('/logout', (request, response) => {
    console.log(request.body);
    if (!request.body) {
        response.status(400).json({ message: 'invalid body', status: 400});
    } else {
        response.status(200).json({ message: 'ok', status: 200});
    }
});

app.post('/token', (request, response) => {
    console.log(request.body);
    if (!request.body || !request.body.refreshToken) {
        response.status(400).json({ message: 'invalid body', status: 400});
    } else {
        const { refreshToken } = request.body;
        response.status(200).json({ message: `refresh token requested for token: ${refreshToken}`, status: 200});
    }
});

app.post('/forgot-password', (request, response) => {
    console.log(request.body);
    if (!request.body || !request.body.email) {
        response.status(400).json({ message: 'invalid body', status: 400});
    } else {
        const { email } = request.body;
        response.status(200).json({ message: `forgot password for email: ${email}`, status: 200});
    }
});

app.post('/reset-password', (request, response) => {
    console.log(request.body);
    if (!request.body || !request.body.email) {
        response.status(400).json({ message: 'invalid body', status: 400});
    } else {
        const { email } = request.body;
        response.status(200).json({ message: `password reset for  email: ${email}`, status: 200});
    }
});

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