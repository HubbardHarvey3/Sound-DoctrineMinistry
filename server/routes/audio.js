// define API endpoints

const express = require('express')
const audio = express.Router()
const jsonData = require('../messages.json')
const app = express()
const path = require('path');

app.use(express.static(path.join(__dirname, './serverAssets')))


//route used by Angular to display all of the audio file information on the Listen page.
audio.get('/json', (req, res) => {
    res.send(jsonData)
})

//This route serves the mp3 files from the serverAssets folder which houses the server.js
audio.get('/:name', (req, res) => {
    res.sendFile(path.join(__dirname, '../serverAssets/' + req.params.name + '.mp3'));
});

module.exports = audio