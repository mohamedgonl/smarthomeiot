const devices = require("../models/Devices");
const mongoose = require('mongoose')


const getData = async (req, res) => {
    
    try {
        const data = req.body;
        const {user} = data;
        console.log(user);
        const device = await devices.find({
            'user' : user
        }).populate('user')
        console.log(device);
        res.status(200).json(device)

        
    } catch (err) {
        res.status(500).json(err)
    }
}

const receiveData = async (req, res) => {
    try {
        const deviceInfo = req.body;
        console.log(deviceInfo);
        //.log(deviceInfo);
        const newdev = await devices.findOneAndUpdate({
            _id: deviceInfo.id
        },{
            $push: {
                data : {
                    value: deviceInfo.value
                }
            }
        },{new: true})
    
        return res.json(deviceInfo)
        //res.status(200).json(newdev);
    } catch (err) {
        res.status(500).json({error: err})
    }
}

module.exports = {
    getData,
    receiveData
}
