const User = require('../models/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const bcrypt = require('bcrypt')
// const { Console } = require('console')
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
function sortingJSON(arr) {
    sortedArr.push(arr[1])
    arr.forEach((element) => {

        let unsortedDate = element.name.substring(3)
        //console.log(unsortedDate)
        let sortedIndex
        let match = false
        //loop through the sorted array to check if the unsortedDate is greater than
        sortedArr.forEach((sortEle, ind) => {
            //if unsortedDate is less than the sortedelement, then capture the index of the sorted
            //element
            if (unsortedDate < sortEle.name.substring(3)) {
                sortedIndex = ind
            }
            //if unsortedDate is equal to sortedElement, then toogle boolean
            else if (unsortedDate === sortEle.name.substring(3)) {
                match = true
            }
        })
        //if the two dates are a match, then do nothing
        if (match) {

        }
        //however, if the unsorted date is greater than, splice using the first arg as the captured
        //index gained in the sortedArray foreach loop.
        //if the unsortedDate was smaller greater than all of the elements in SortedArray, no index will return
        //if no index is captured, then the sortedIndex +1 will be outside the array lenght and the element added
        //to the end of the array.
        else {
            // console.log(sortedIndex)
            sortedArr.splice(sortedIndex + 1, 0, element)
        }
        //console.log(sortedArr)
        return sortedArr
    })

}

//This only sorts the messages.json file
module.exports.upload_api = (req, res) => {
    let audioInfo = req.body
    res.status(200).send("Success")

    fs.readFile('messages.json', function (err, data) {
        // get the existing JSON Data
        let oldData = JSON.parse(data)
        // Push in the new data
        oldData.unshift(audioInfo)
        //below is the customer sorting middleware
        sortingJSON(oldData)
        //sortingJSON()
        // console.log(sortedArr)
        fs.writeFile('messages.json', JSON.stringify(sortedArr), function (err) {
            if (err) throw err;
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

