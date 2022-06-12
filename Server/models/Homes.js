const mongoose = require('mongoose')


const homes = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    rooms: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'rooms'
        }
    ]
}, {collection: 'homes'})

module.exports = mongoose.model('homes', homes)