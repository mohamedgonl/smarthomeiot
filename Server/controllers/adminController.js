const User = require('../models/Users')
const Devices = require('../models/Devices')
const Homes = require('../models/Homes')
const Rooms = require ('../models/Rooms')

const deleteAll = async (req,res) => {
    try {
        const e = req.params.e
        switch (e) {
            case 'accounts':
                await User.deleteMany();
                break;
            case 'devices':
                await Devices.deleteMany();
                break;
            case 'homes' :
                await Homes.deleteMany();
                break;
            case 'rooms':
                await Rooms.deleteMany();
                break;
            default:
                break;
        } 
        res.status(200).json({
            status: 'OK',
            msg: `Admin delete ${e} success`
        })
    } catch (err) {
        res.status.json({
            status: 'ERR',
            error: err
        })
    }
}
module.exports = deleteAll