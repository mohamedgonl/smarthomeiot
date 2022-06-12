const mongoose = require('mongoose')


const rooms = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    home: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'homes'
    },
    devices: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'devices'
        }
    ]
}, {collection: 'rooms'})

module.exports = mongoose.model('rooms', rooms)