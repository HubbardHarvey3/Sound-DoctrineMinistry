// define API endpoints

const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const jsonData = require('../messages.json')
const fs = require('fs')
const User = require('../models/user')
const { json } = require('express')
const { stringify } = require('querystring')
const audio = require('./audio')
const multer = require('multer')
const dbStuff = require('../config.json')
const authController = require('../contollers/authController')
const { body } = require('express-validator')


// File UPload middleware
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './serverAssets/')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


// Connection String and connection to db
const db = dbStuff.db
mongoose.connect(db, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to DB!!!!')
    }
})

//Middleware that will verify the token is legit
// however if token is invalid, the server crashes.  need to try to get below commented code working
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized Request")
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send("Unauthorized Request")
    }
    let payload = jwt.verify(token, dbStuff.secretKey)
    if (!payload) {
        return res.status(401).send("Unauthorized Request")
    }
    req.userId = payload.subject
    next()
}

//handles the login post request
// the array in the middle sanitizes incoming data labeled password and email.
router.post('/login', [body('password').escape(), body('email').escape()], authController.login_api)
// This route only updates the messages.json
router.post('/upload', [
    body('name').escape(),
    body('title').escape(),
    body('month').escape()
], verifyToken, authController.upload_api)

// handles the actual file upload
router.post('/uploadAudio', verifyToken, upload.single('audioFile'), (req, res) => {
    console.log("Audio Upload Attempt")
    res.status(200).send("File Sent")
})



module.exports = router

