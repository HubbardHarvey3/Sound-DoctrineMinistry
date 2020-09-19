const User = require('../models/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const bcrypt = require('bcrypt')
// const { Console } = require('console')
const config = require('../config.json')
const audio = require('../routes/audio')

//Hashing Stuff
const saltRounds = config.saltNum;
const salt = bcrypt.genSaltSync(saltRounds)


module.exports.upload_api = (req, res) => {
    let audioInfo = req.body
    res.status(200).send("Success")

    fs.readFile('messages.json', function (err, data) {
        // get the existing JSON Data
        let oldData = JSON.parse(data)
        // Push in the new data
        oldData.unshift(audioInfo)
        // console.log(oldData)
        fs.writeFile('messages.json', JSON.stringify(oldData), function (err) {
            if (err) throw err;
            // console.log("The data was appended")
        })
    })
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



    // User.findOne({ email: userData.email }, (err, user) => {
    //     // this is data from DB
    //     console.log(user)
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         // check the email is in the DB
    //         if (!user) {
    //             res.status(401).send("Wrong Email")
    //         } else {
    //             // check the password matches what is in the DB
    //             //password in DB is encrpyted and the if statement contains the check from bcrypt
    //             // user.password !== userData.password
    //             if (user.password !== userData.password) {
    //                 console.log("WRONG PASSWORD")
    //                 res.status(401).send("WRONG PASSWORD")
    //             } else {
    //                 let payload = { subject: user._id }
    //                 let token = jwt.sign(payload, 'secretKey')
    //                 res.status(200).send({ token })
    //             }
    //         }
    //     }
    // })
}

module.exports.overwrite_api = async (req, res) => {
    // console.log(req.body)
    fs.writeFile('messages.json', JSON.stringify(req.body), function (err) {
        if (err) throw err;
        // console.log("The data was appended")
    })
    console.log("Broadcasts Deleted")
}