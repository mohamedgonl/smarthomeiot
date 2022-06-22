const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const account = require('./routers/account')
const home = require('./routers/home')
const room = require('./routers/room')
const device = require('./routers/device')
const app = express();
const connection = require('./connection')
const { connectMQTT } = require('./mqtt')
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
// app.use(cors({origin: true, credentials: true}));

const corsOpts = {
    origin: '*',
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOpts));

// routing
app.use('/account', account)
app.use('/home', home)
app.use('/device', device)
app.use('/room', room)

// connect database
 connection()
 connectMQTT()

app.get('/', (req, res) => {
    res.send('SUCCESS')
})
//recvData();

app.listen(process.env.PORT || 5000, ()=>{

});






// const mqtt = require('mqtt')

//     const options = {
//     // Clean session
//     clean: true,
//     connectTimeout: 4000,
//     // Auth
//     clientId: 'c373f1a2-3766-4598-b84a-cf401621663e',
//     reconnectPeriod: 1000,
// }
// const broker = 'mqtt://broker.hivemq.com:1883';
// const topic = 'datatest1';
// const client  = mqtt.connect(broker,options)


//  //client.on('connect',()=>{
//     client.subscribe(topic,(err)=>{
//     if(err)  console.log(err);
//     console.log('Subcribed!');
//     })
//  //})
// client.on('message',(tp,data)=>{
//    console.log(data.toString());
//    client.end();
// })







