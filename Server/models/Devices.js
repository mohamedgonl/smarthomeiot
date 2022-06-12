const mongoose = require('mongoose')

const devices = mongoose.Schema({
    deviceName: {
        type: String,
        default: ''
    },
    deviceType: {
        type: String,
        default: ''
    },
    data: [{
        value : {
            type: String,
            default: ''
        },
        createAt : {
            type: Date,
            default: Date.now()
        }
    }]
  
}, {collection: 'devices'})

module.exports = mongoose.model('devices', devices)
