const devices = require("../models/Devices");


const createDevice = async (req,res) => {
    try {
        const newDevice = req.body;
        const device = new devices(newDevice)
        await device.save()
        res.status(200).json(device)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const deleteDevice = async(req,res) =>{
    try {
        const {_id} = req.body;
        findByIdAndDelete(_id);
        res.status(200).json({
            status: 'OK',
            msg: 'Delete device success!'
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

module.exports = {createDevice, deleteDevice}