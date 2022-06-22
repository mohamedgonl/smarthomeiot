const Devices = require("../models/Devices")



const getLastHour= async (req,res) => {

    try {
        const time = req.params.time;
        // console.log(time,typeof time);
        const prehour = new Date(new Date().getTime()-60*60*1000*time);
        var devices = await Devices.findOne({
            deviceType : req.params.type,
        }) 
        devices = devices.data
        console.log(devices);
        const data = devices.filter(e => e.createAt >= prehour)
        res.status(200).json({
        status : 'OK',
        msg: 'Get data last  hour success',
        data: data
    })
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Get data last hour failed!',
            error: err
        })
    }
  
}


const dayStatics = (req, res) => {
    try {
    
    } catch (err) {
        res.status(200).json({
            error: err
        })
    }
}

// thong ke theo tuan
const weekStatics = (req,res) => {
    try {
        
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

// thong ke theo thang

const monthStatics = (req,res) => {
    try {
        
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

module.exports = {dayStatics,weekStatics,monthStatics,getLastHour}