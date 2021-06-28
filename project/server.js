const express = require('express'),
    path = require('path');

const server = express();

server.use('/out', express.static(path.join(__dirname, '../out')));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})