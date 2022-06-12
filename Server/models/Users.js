const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    fullname: {
        type: String,
        default: ''
    },
    home: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null,
        ref: 'homes'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
}, {collection: 'users'})


module.exports = mongoose.model('users', users)
