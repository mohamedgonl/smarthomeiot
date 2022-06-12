const mqtt = require('mqtt')
const broker = 'mqtt://broker.hivemq.com:1883';
const topic = 'control';
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Auth
    clientId: 'c373f1a2-3766-4598-b84a-cf401621663e',
}
const client = mqtt.connect(broker, options);


const control = async (req, res) => {
    try {
        const device = req.body;
        const data = {
            _id: device._id,
            value: device.value,
            status: device.status
        }

        // client.on('connect', () => {
        console.log('Connected broker')
        client.publish(topic, JSON.stringify(data), (err) => {
            if (err) 
                console.log('MQTT publish error: ', err);
             else 
                console.log('Published!');
            
        })
        // })
        console.log(data);
        res.status(200).json({status: 'OK', data: data})
    } catch (err) {
        res.status(500).json({error: err})
    }
}
module.exports = {
    control
}
