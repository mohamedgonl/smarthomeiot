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
    }],
    control: {
        status: {
            type: String,
            default: 'off'
        },
        mode: {
            type: String,
            default: ''
        },
        direction: {
            type: String,
            default: ''
        },
        speed: {
            type: String,
            default: ''
        },
        intensity: {
            type: String,
            default: ''
        }

    }
  
}, {collection: 'devices'})

module.exports = mongoose.model('devices', devices)
