const Devices = require("../models/Devices");
const { findById } = require("../models/Devices");
const Homes = require("../models/Homes");
const Rooms = require("../models/Rooms");


const getTemperature = async (req,res) => {
    try {
        const {roomId} = req.params;
        const room = await Rooms.findById(roomId);
        const devices = room.devices;
        console.log(devices);
        var value;
        for (let i = 0; i < devices.length; i++) {
            const device = await Devices.findById(devices[i]);
            if(device.deviceType == 'temperature') {
                var data = device.data;
                value = data[data.length - 1];
                console.log(value);
                break;
            } 
        }
        res.status(200).json({
            status: 'OK',
            msg: 'Get room temperature success',
            temperature: value
        })
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Server error',
            error: err
        })
        
    }
}
const getHumidity = async (req,res) => {
    try {
        const {roomId} = req.params;
        const room = await Rooms.findById(roomId);
        const devices = room.devices;
        var humidities ;
        for (let i = 0; i < devices.length; i++) {
            let device = await Devices.find({
                _id : devices[i],
                deviceType: 'humidity'
            },{
                data: {
                    $slice: -10
                }
            });
            if(device.length != 0){
                 console.log('Device nhan: ', device);
                 humidities = device
                break;
            } 
        }
        console.log(humidities);

        res.status(200).json({
            ok: 'OK',
            humidities: humidities
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

const getRoomData = async (req, res) => {
    try {
        const room = await Rooms.findById(req.params.roomId).populate('devices').exec()
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

const removeDevice = async (req,res) => {
    try {
        const {deviceId, roomId} = req.params;
        await Rooms.updateOne({_id: roomId},{
            $pullAll: {
                devices: [{_id: deviceId}]
            }
        })
        res.status(200).json({
            status: 'OK',
            msg: 'Remove device from room success'
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
            name: roomInfo.name
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

module.exports = {getRoomData,createRoom, getTemperature, removeDevice, getHumidity}