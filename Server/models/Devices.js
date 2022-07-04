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
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: '1'
        },
        direction: {
            type: Number,
            default: 0
        },
        speed: {
            type: Number,
            default: 0
        },
        intensity: {
            type: Number,
            default: 0
        }

    }
  
}, {collection: 'devices'})

module.exports = mongoose.model('devices', devices)
