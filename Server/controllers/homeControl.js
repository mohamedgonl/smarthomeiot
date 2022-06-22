const devices = require("../models/Devices");
const mongoose = require('mongoose')
const User = require('../models/Users')
const Home = require('../models/Homes');
const Rooms = require("../models/Rooms");
const { findByIdAndUpdate, findById } = require("../models/Devices");



const getHomeData = async (req, res) => {
    
    try {
        console.log(req.params.accountId);
       const account = await User.findById(req.params.accountId)
       console.log(account);
       const home =await Home.findById(account.home);
       res.status(200).json({
        status: 'OK',
        msg: 'Get home data success!',
        home: home
       })
       
    } catch (err) {
        res.status(500).json({
            status: 'ERR',
            msg: 'Server error',
            error: err
        })
    }
}

module.exports = {
    getHomeData
}
