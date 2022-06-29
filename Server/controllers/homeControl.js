const devices = require("../models/Devices");
const mongoose = require('mongoose')
const User = require('../models/Users')
const Rooms = require("../models/Rooms");
const { findByIdAndUpdate, findById } = require("../models/Devices");
const Homes = require("../models/Homes");



const getHomeData = async (req, res) => {
    
    try {
       const account = await User.findById(req.params.accountId)
       const home =await Homes.findById(account.home).populate('rooms')
    //    .populate('devices','deviceName').exec();
       console.log(home);
       res.status(200).json({
        status: 'OK',
        msg: 'Get home data success!',
        home: home
       })
       
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Server error',
            error: err
        })
    }
}

const deleteRoom = async (req,res) => {
    try {
        const {roomId, homeId} = req.params;
        console.log('roomid ',roomId);
        await Homes.updateOne({_id: homeId}, {
            $pullAll : {
                rooms: [{_id: roomId}]
            }
        })
        console.log('homeid: ',homeId);
         await Rooms.findByIdAndDelete(roomId)
            res.status(200).json({
            status: 'OK',
            msg: 'Delete Room success'})
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Server error',
            error : err
        })
    }    
}

module.exports = {
    getHomeData, deleteRoom
}
