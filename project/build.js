const browserify = require('browserify'),
    babelify = require('babelify'),
    path = require('path'),
    fs = require('fs'),
    exorcist = require('exorcist'),
    OUT_FILE = path.join(__dirname, '../out', 'bundle.js');
    MAP_FILE = path.join(__dirname, '../out', 'bundle.js.map');


const build = browserify({ debug: true, basedir: path.join(__dirname, '../src') });

build.pipeline.on('file', (file) => {
        console.error(`Transpiling ${file} with babel and browserify...`);
    });

build.pipeline.on('error', (err) => {
    console.error(`Error with build: ${err.message}`);
})

build.transform(babelify.configure({
    compact: true,
    comments: false,
    }))
    .require('index.js', { entry: true })
    .bundle()
    .pipe(exorcist(MAP_FILE))
    .pipe(fs.createWriteStream(OUT_FILE, 'utf8'));