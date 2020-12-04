const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Hello world');
});

app.get('/status', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
});

app.post('/signup', (request, response, next) => {
    next(new Error('test'));
    //response.status(200).json({ message: 'ok', status: 200});
});

app.post('/login', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
});

app.post('/logout', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
});

app.post('/forgot-password', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
});

app.post('/reset-password', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
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