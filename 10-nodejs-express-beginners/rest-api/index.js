const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Hello world');
});

app.get('/status', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
});

app.post('/signup', (request, response) => {
    response.status(200).json({ message: 'ok', status: 200});
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});