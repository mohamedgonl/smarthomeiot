const Devices = require("../models/Devices");
const Homes = require("../models/Homes");
const Rooms = require("../models/Rooms");
const { findById } = require("../models/Users");
const users = require("../models/Users");


const login = async (req, res) => {
    try {
        const account = req.body;
        const isExist = await users.findOne({username: account.username, password: account.password})
        if (isExist) {
        
            const user = await users.findOne({
                _id : isExist._id
            })
            // .populate({path: 'home', model: 'homes', populate : {
            //     path: 'rooms', model: 'rooms', populate: {
            //         path: 'devices', model: 'devices'
            //     }
            // }})
        
           res.status(200).json({status: 'OK', msg: 'Login success!',user})
        }
         else 
            res.status(200).json({status: 'NO', msg: 'INCORRECT ACCOUNT'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error})
    }
}

const register = async (req, res) => {
    try {
        const account = req.body;
        console.log(account);
        const isExist = await users.findOne({username: account.username})
        if (isExist) {
            res.status(200).json({status: 'NO', msg: "Account existed!"})
        } else {
            const newAccount = new users({...account});
            await newAccount.save();
            res.status(200).json({status: 'OK', msg: "Create account success!", account: newAccount})
        }
    } catch (err) {
        res.status(500).json({error: err})
    }
}

module.exports = {
    login,
    register
}
