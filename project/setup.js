const fs = require('fs'),
    path = require('path'),
    childProcess = require('child_process');
const { stderr } = require('process');

    
function setupProject() {
    fs.mkdir(path.join(__dirname, '../out'), (err) => {
        console.error(`Could not set up project: ${err.message}`)
    });

    childProcess.exec('npm install').stderr.pipe(stderr);
}

setupProject();