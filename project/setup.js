const fs = require('fs'),
    path = require('path');

function setupProject() {
    fs.mkdir(path.join(__dirname, '../out'), (err) => {
        console.error(`Could not set up project: ${err.message}`)
    });
}

setupProject();