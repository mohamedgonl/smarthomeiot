import {Text, View, SafeAreaView, ActivityIndicator} from 'react-native'
import {useState, useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {ColorMode,ControlSlider,ModePicker,StatusView} from './ControlComponents'
import axios from 'axios';

export default function Device({navigation, route}){
    const deviceId = route.params;
    const [deviceInfo, setDeviceInfo] = useState({
        deviceName: '',
        deviceType: ''
    });
    const [control, setControl] = useState({
        status: false,
        mode :'',
        direction: 0,
        speed : 0,
        intensity: 0
    });
    const [reload, setReload] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDeviceData()
    }, [reload]);

    const getDeviceData = async () => {
        try {
            setLoading(true);
            const url = 'https://smarthome-iot-hust.herokuapp.com/device/'+deviceId;
            await axios.get(url)
            .then(res => res.data.deviceInfo)
            .then(data => {
                setDeviceInfo({
                    deviceName: data.deviceName,
                    deviceType: data.deviceType
                })
                setControl({
                    status: data.control.status =='off'? false: true,
                    mode: data.control.mode,
                    direction: data.control.direction,
                    speed: data.control.speed,
                    intensity: data.control.intensity
                })
            })
            .finally(()=>{
                setLoading(false)
            })
        } catch (err) {
            console.log('err here',err);
        }
    }




    return(
        <SafeAreaView style={{flex: 1, marginBottom: 110, paddingBottom: 50}}>
            {loading?<ActivityIndicator style={{flex:1, justifyContent: 'center'}}></ActivityIndicator>:
            <>
            {!control.status ? 
        // Unenable View
        <View style= {{flex: 1, justifyContent: 'center', padding: 30, paddingTop: 0, paddingBottom: 90, alignItems: 'center'}}>
        <Text style={{fontSize: 25, fontStyle: 'italic', fontWeight: '500', marginBottom: 20, textAlign: 'center'}}>The device <Text style={{color: 'red'}}>{deviceInfo.deviceName}</Text> is off</Text>
        <StatusView isEnabled={control.status} setIsEnabled = {()=>setControl({...control, status: !control.status})} ></StatusView>
        </View> 
        // Enable control view
        :<View style={{zIndex: 1}}>
            <Text style={{  fontSize: 20, fontWeight: '500', fontStyle:'italic', marginTop: 40, marginRight:25, marginLeft:22, paddingBottom:5}}>Device: <Text style={{color: 'tomato'}}>          {deviceInfo.deviceName}</Text></Text>
            <View style={{flexDirection:'row', flexWrap:'wrap',  marginTop: 10, padding: 10}}>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20, width: 100, fontWeight: '500', fontStyle:'italic', marginRight:25, marginLeft:10, paddingBottom:5}}>Status:</Text>
                <StatusView isEnabled={control.status} setIsEnabled = {()=>setControl({...control, status: !control.status})} ></StatusView>
            </View>
            <ControlView type={deviceInfo.deviceType} control={control}></ControlView>
            <TouchableOpacity
                     style={{backgroundColor:'#B5D29E', borderRadius: 25, borderColor:'black', height: 40, width:80, justifyContent: 'center', alignSelf: 'center', marginTop:30}}>
                        <Text style={{textAlign: 'center', fontStyle:'italic', fontWeight:'500'}}>Save</Text>
            </TouchableOpacity>
        </View>
         
        }
            </>}
        
        
        </SafeAreaView>
       
           
    )
}


const ControlView = ({type, control}) => {
    switch (type) {
        case 'fan':
            return(
                <View>
                    <ModePicker modes={[
          {label: 'Cực mạnh', value: '1'},
          {label: 'Mạnh', value: '2'},
          {label: 'Vừa', value: '3'},
          {label: 'Nhẹ', value: '4'},
          {label: 'Cực nhẹ', value: '5'},
       ]}></ModePicker>
                    <ControlSlider name={'Speed'} value={control.speed} max={100}></ControlSlider>
                    <ControlSlider name={'Direction'} value={control.direction} max={180}></ControlSlider>
                </View>
            )
        case 'air-conditioner':
          

            return(
                <View>
                    <ModePicker  ></ModePicker>
                    <ControlSlider name={'Speed'} value={control.speed} max={100}></ControlSlider>
                    <ControlSlider name={'Direction'} value={control.direction} max={180}></ControlSlider>
                    <ControlSlider name={'Temperature'} value={control.intensity} max={100}></ControlSlider>
                </View>
            )
        case 'lightbulb-on': 
             const modes = [
                         {label: '1 màu', value: '1'},
                         {label: 'Nhấp nháy', value: '2'},
                         {label: '7 sắc cầu vồng', value: '3'} ];
            return(
                    <View>
                        <ModePicker modes={modes}></ModePicker>
                        <ColorMode></ColorMode>
                    </View>
                )
        default:
            return(
                <View></View>
            )
            break;
    }
}

