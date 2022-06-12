const Devices = require("../models/Devices")


const getlasthour = (type) => {
  
   const devices = Devices.findOne({
     deviceType: type,
     data: {
         $and:[
            {
            "createAt": {
                $gte: new Date(ISODate().getTime() - 1000 * 60 * 60)
            }}, 
            { 
            "createAt": {
                $lte: ISODate()
            }}
        ]
    }
})
    return devices.data ;
}

const getLastHour= async (req,res) => {
    const temperature = getlasthour('temperature')
    const humidity = getlasthour('humidity')
    res.status(200).json({
        temperature: temperature,
        humidity: humidity
    })
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