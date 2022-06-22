const mqtt = require('mqtt');
const { updateData } = require('./controllers/deviceControl');

const options = {
    // Clean session
   //clean: true,
  // connectTimeout: 10000,
    // Auth
  // clientId: 'c373f1a2-3766-4598-b84a-cf401621663e',
}
const broker = 'mqtt://broker.hivemq.com:1883';
const topic = 'datatest1';



const connectMQTT = () => {
    try {
        const client = mqtt.connect(broker, options)
        console.log('MQTT connected!');
        client.on('connect', () => {
           client.subscribe(topic);
           })
          client.on('message', (tp, msg) => {
            var data = JSON.parse(msg)
           
            console.log('Received MQTT msg:',data );
            updateData(data)
           })
    } catch (err) {
        console.log(err);
    }
}
module.exports = {connectMQTT}