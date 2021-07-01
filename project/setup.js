const fs = require('fs'),
    path = require('path'),
    childProcess = require('child_process');

    
function setupProject() {
    childProcess.execSync('npm install')

    fs.mkdir(path.join(__dirname, '../out'), (err) => {
        console.error(`Could not set up project: ${err.message}`)
    });
}

setupProject();