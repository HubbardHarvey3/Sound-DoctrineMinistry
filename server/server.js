// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./routes/api')
const audio = require('./routes/audio')
const cors = require('cors')

//variable to hold the json which contains the name and titles of the mp3 files

const app = express();
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist/SoundDoctrine')));
app.use(express.static(path.join(__dirname, './serverAssets')))

// Here we have a compact routes: API deals with the upload and audio handles with endpoints for streaming the podcasts
app.use('/api', api)
app.use('/audio', audio)

//base route 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/SoundDoctrine/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));