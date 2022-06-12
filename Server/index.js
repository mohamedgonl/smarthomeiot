const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const log = require('./routers/log')
const data = require('./routers/data')
const device = require('./routers/device')
const static = require('./routers/statics')
const app = express();
const connection = require('./connection')

const port = process.env.port || 5000

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
app.use('/log', log)
app.use('/data', data)
app.use('/device', device)
app.use('/static', static)

// connect database
connection()
app.get('/', (req, res) => {
    res.send('SUCCESS')
})
app.listen(process.env.PORT || 5000, () => {});




