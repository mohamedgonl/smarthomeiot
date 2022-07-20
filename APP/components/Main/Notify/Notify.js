import {Text, View, ScrollView, TouchableOpacity} from 'react-native'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIon from 'react-native-vector-icons/Ionicons';
import MQTT from 'sp-react-native-mqtt';
export default function Notify(){

    // MQTT.createClient({
    //     uri: 'mqtt://broker.hivemq.com:1883',
    //     // clientId: 'your_client_id'
    //   }).then(function(client) {
      
    //     client.on('closed', function() {
    //       console.log('mqtt.event.closed');
    //     });
      
    //     client.on('error', function(msg) {
    //       console.log('mqtt.event.error', msg);
    //     });
      
    //     client.on('message', function(msg) {
    //       console.log('mqtt.event.message', msg);
    //     });
      
    //     client.on('connect', function() {
    //       console.log('connected');
    //       client.subscribe('/notify', 0);
    //     });
      
    //     client.connect();
    //   }).catch(function(err){
    //     console.log(err);
    //   });


    //  const [notifies, setNotifies] = useState(init);
     // const init = [{type: 'danger', title: 'Danger!', content: 'Nhiệt độ phòng bếp lên quá cao, đã kích hoạt chế độ dập lửa', datetime: Date.now}]
    


      const Noti = ({type, title, content, datetime}) => {
        var icon, color='#C4C4C4';
        switch (type) {
            case 'danger':
                icon = <IconIon name='alert-circle' color={'white'} size={65}></IconIon>
                color = '#FF7575'
                break;
            case 'warn':
                icon = <IconIon name='warning' color={'white'} size={65}></IconIon>
                color = '#D9C04C'
                break;
            case 'success':
                icon = <IconIon name='checkmark-done-circle-sharp' color={'white'} size={65}></IconIon>
                color = '#71CF58'
                break;
            default:
                icon = <IconAntDesign name='infocirlce' color={'white'} size={60}></IconAntDesign>
                color = '#4CB4D9'
                break;
        }
        return (
            <View style={{width: 400, height: 100, backgroundColor: color, margin: 10, marginBottom: 0, borderRadius: 15, paddingHorizontal: 10, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center', height: '100%', width: 65}}>
                    {icon}
                </View>
                <View style={{width: 330, padding: 5, height: '100%', paddingRight: 10}}>
                    <Text style={{fontSize: 25, fontWeight: '700', color: 'white'}}>{title}</Text>
                    <Text style={{color: 'white', fontWeight: '300'}}>{content}</Text>
                    <Text style={{color: 'white', fontWeight: '200', fontStyle: 'italic', position: 'absolute', right: 5, bottom: 0}}>{datetime}</Text>
                </View>
                <TouchableOpacity>
                    <IconFeather name='x-circle' size={25} color={'white'} style={{position: 'absolute', right: 5}}></IconFeather>
                </TouchableOpacity>
            </View>
        )
    }
    return(
       <ScrollView >
        <Noti type = 'danger' title={'Danger!'} content={'Nhiệt độ phòng bếp lên quá cao, đã kích hoạt chế độ dập lửa'} datetime={'15/07/2022 - 11:32AM'} ></Noti>
        <Noti type = 'warn' title={'Warning'} content={'Bạn đang để nhiệt độ điều hòa quá thấp, kiến nghị nâng nhiệt độ lên 26°C'} datetime={'16/07/2022 - 21:32PM'} ></Noti>
        <Noti  title={'Good morning!'} content={'Nhiệt độ trong phòng là 26°C, nhiệt độ ngoài trời hiện tại là 34°C, độ ẩm 70%, khả năng có mưa 80%'} datetime={'17/07/2022 - 06:32AM'} ></Noti>
        <Noti type = 'success' title={'Every thing is OK'} content={'Mọi thứ đang hoạt động ổn áp'} datetime={'18/07/2022 - 10:00AM'} ></Noti>
        {/* {notifies.map(e => <Noti type={e.type} title ={e.title} content={e.content} datetime={e.datetime} ></Noti>)} */}
       </ScrollView>
    )
}

