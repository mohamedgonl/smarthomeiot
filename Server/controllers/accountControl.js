const Devices = require("../models/Devices");
const Homes = require("../models/Homes");
const Rooms = require("../models/Rooms");
const { findById, findByIdAndUpdate } = require("../models/Users");
const Users = require("../models/Users");

const changePassword = async (req, res) => {
    try {
        const account = req.body;
        const newAccount = await  Users.findByIdAndUpdate({
            _id: account.accountId
        }, {
            password: account.newPassword
        })
        if(newAccount) res.status(200).json({
            status: 'OK',
            msg: 'Change password success',
        })
        else res.status(200).json({
            status: 'NO',
            msg: 'Change password fail'
        })
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Server Error',
            error: err
        })
    }
}
const updateInfo = async (req, res) => {
    try {
        const account = req.body;
        const newAccount = await Users.findOneAndUpdate(
          { _id: req.params.accountId }
        ,{
            fullname: account.fullname,
            phone: account.phone
        })
        console.log(newAccount);
        res.status(200).json({status: 'OK', msg: 'Update infomation success', newInfo: newAccount});
        //else res.status(200).json({status: 'NO', msg: 'Update infomation fail',newInfo: newAccount})
    } catch (err) {
        res.status(500).json({status: 'ERR', msg: 'Server error', error: err})
    }
}

const login = async (req, res) => {
    try {
        const account = req.body;
        const usernameExist = await Users.findOne({username: account.username})
        if (usernameExist) {
            if(usernameExist.password == account.password) {
                res.status(200).json({
                    status: 'OK',
                    msg: 'Login success!',
                    accountId : usernameExist._id
                })
            }else {
                res.status(200).json({
                    status: 'NO',
                    msg: 'Password incorrect!'
                })
            }
           // const user = await users.findOne({
             //   _id : isExist._id
            //})
            // .populate({path: 'home', model: 'homes', populate : {
            //     path: 'rooms', model: 'rooms', populate: {
            //         path: 'devices', model: 'devices'
            //     }
            // }})
        }
         else 
            res.status(200).json({status: 'NO', msg: 'Account not existed!'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error})
    }
}

const register = async (req, res) => {
    try {
        const account = req.body;
        console.log(account);
        const isExist = await Users.findOne({username: account.username})
        if (isExist) {
            res.status(200).json({status: 'NO', msg: "Account existed!"})
        } else {
           
            const newHome = new Homes();
            await newHome.save();
            const newAccount = new Users({
                username: account.username,
                password: account.password,
                phone: account.phone ? account.phone: '',
                fullname: account.fullname? account.fullname:'',
                home:  newHome._id
            });
            await newAccount.save();
            res.status(200).json({status: 'OK', msg: "Create account success!", accountId: newAccount._id, homeId: newHome._id})
        }
    } catch (err) {
        res.status(500).json({status: 'ERR', msg: 'Server Error', error: err})
    }
}

module.exports = {
    login,
    register,
    updateInfo,
    changePassword
}
