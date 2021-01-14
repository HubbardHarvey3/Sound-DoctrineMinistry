const User = require('../models/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const bcrypt = require('bcrypt')
const config = require('../config.json')
const audio = require('../routes/audio')

//Hashing Stuff
const saltRounds = config.saltNum;
const salt = bcrypt.genSaltSync(saltRounds);

/**
 * @param {array} the array of data to be sorted chronologically with latest date on top
 * @returns the sortedArr variable to be written into messages.json
 */

let sortedArr = [];
function sortingByEpisode(messageList) {
    messageList.sort(function (a, b) {
        return b.episode - a.episode
    })
    sortedArr = messageList
    return sortedArr
}

//This only sorts the messages.json file
module.exports.upload_api = (req, res) => {
    let audioInfo = req.body
    res.status(200).send("Success")

    fs.readFile('./server/messages.json', function (err, data) {
        // get the existing JSON Data
        let oldData = JSON.parse(data)
        // Push in the new data
        oldData.unshift(audioInfo)
        // Sort Data:
        sortingByEpisode(oldData)

        fs.writeFile('./server/messages.json', JSON.stringify(sortedArr), function (err) {

            if (err) throw err;
        })
    })
    sortedArr = []

}

module.exports.login_api = async function (req, res) {
    try {

        // this is data from the form
        let userData = req.body
        let userPassword = req.body.password
        const user = await User.findOne({ email: userData.email });
        if (user) {
            const auth = await bcrypt.compare(userPassword, user.password)
            if (auth) {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, config.secretKey)
                res.status(200).send({ token })
            } else {
                throw Error("Incorrect Password")
            }
        } else {
            throw Error("Incorrect Email")
        }
    } catch (err) {
        res.status(400).json({
            'error': "Invalid Username or Password"
        });
    }
}

module.exports.overwrite_api = async (req, res) => {
    let oldDataDelete = req.body

    sortingByEpisode(oldDataDelete)
    fs.writeFile('./server/messages.json', JSON.stringify(sortedArr), function (err) {
        if (err) throw err;
        // console.log("The data was appended")
        res.status(200).send("Broadcast Deleted")
    })
}

module.exports.deleteFile_api = async (req, res) => {
    fileToDelete = `./server/serverAssets/${req.body.itemName}.mp3`
    // delete the filename that was sent from the backend.
    fs.unlink(fileToDelete, (err) => {
        if (err) {
            console.error('No File Found!')
            res.status(400).send('File Not Found')
        } else {
            res.status(200).send("File Removed")
        }
    })
}

