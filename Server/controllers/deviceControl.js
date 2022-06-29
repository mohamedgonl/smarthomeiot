const mqtt = require('mqtt');
const { findByIdAndUpdate } = require('../models/Devices');
const broker = 'mqtt://broker.hivemq.com:1883';
const topic = 'control';
const Devices = require("../models/Devices");
const Rooms = require('../models/Rooms');
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Auth
    clientId: 'c373f1a2-3766-4598-b84a-cf401621663e',
}
const client = mqtt.connect(broker, options);
const Room = require('../models/Rooms')



const getData = async (req,res) => {
    try {
        res.status(200).json({
            status: 'OK',
            msg: 'Get Data success',
            value: value
        })

        

    } catch (err) {
        res.status(500).json({
            status: "ERR",
            msg: 'Server Error',
            error: err
        })
    }
}

const control = async (req, res) => {
    try {
        const {deviceId, ...control} = req.body;
        console.log('deviceid: ',deviceId);
        console.log('control: ',control);
        await Devices.findByIdAndUpdate({_id: deviceId},{
            control: control
        })
        // client.on('connect', () => {
        // console.log('Connected broker')
        client.publish(topic, JSON.stringify(control), (err) => {
            if (err) 
                console.log('MQTT publish error: ', err);
             else 
                console.log('Published!');
            
        })
        // })
        console.log(control);
        res.status(200).json({status: 'OK',msg:'Send control signal success!', control : control})
    } catch (err) {
        res.status(500).json({status: 'ERR', msg: 'Server Error!',error: err})
    }
}
const getDevice = async (req,res) => {
    try {
        const deviceId = req.params.deviceId;
        const device = await Devices.findById(deviceId);
        res.status(200).json({
            status: 'OK',
            msg: 'Get device info success!',
            deviceInfo: {
                deviceName: device.deviceName,
                deviceType: device.deviceType,
                control: device.control
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "ERR",
            msg: "Something wrong on server",
            error: err
        })
    }
}
const createDevice = async (req,res) => {
    try {
        const {deviceInfo, roomId} = req.body;
        const device = new Devices(deviceInfo)
        await device.save()
        await Room.findByIdAndUpdate(roomId,{
            $push: {
                devices: device._id
            }
        })
        res.status(200).json({
            status: 'OK',
            msg: 'Create new device success!',
            deviceId: device._id
        })
    } catch (err) {
        res.status(500).json({status: 'ERR',msg: 'Server Error',error: err})
    }
}

const deleteDevice = async(req,res) =>{
    try {
        const {deviceId, roomId} = req.body;
        await Room.findByIdAndUpdate({_id: roomId},{
            $pull: {
                devices: [{_id: deviceId}]
            }
        })
        res.status(200).json({
            status: 'OK',
            msg: 'Delete device success!'
        })
    } catch (err) {
        res.status(500).json({
           status: 'ERR',
           msg: 'Server error',
           error: err
        })
    }
}

const updateData = async (data) => {
    try {
   
        const device = await Devices.findByIdAndUpdate(
            data.deviceId
        , {
            $push : {
                data : {
                    value : data.value
                }
            }
            }
        );
     

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getData,control,createDevice, deleteDevice, getDevice, updateData
}
