const { findById } = require("../models/Devices");
const Homes = require("../models/Homes");
const Rooms = require("../models/Rooms");


const getRoomData = async (req, res) => {
    try {
        console.log(req.params.roomId);
        const room = await Rooms.findById(req.params.roomId)
        res.status(200).json({
            status: 'OK',
            msg: 'Get room data success!',
            room: room
        })
        
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Server error',
            error: err
        })
    }
}
const createRoom = async (req,res) => {
    try {
        const {homeId, roomInfo} = req.body
        console.log(homeId);
        console.log(roomInfo);
        const newroom = new Rooms({
            home: homeId,
            ...roomInfo
        })
        await newroom.save()
        console.log(newroom);
        const home = await Homes.findByIdAndUpdate({
            _id : homeId
        },
        {
            $push : {
                rooms: newroom._id
            }
        })
        res.status(200).json({
            status: 'OK',
            msg: 'Add new room success!',
            newRoom: newroom
        })
        
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Server error'
        })
    }
}

module.exports = {getRoomData,createRoom}