import {Text, View, SafeAreaView, ActivityIndicator, AsyncStorage} from 'react-native'
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
    const initControl = {
        status: false,
        mode :'1',
        direction: 0,
        speed : 0,
        intensity: 0
    }
    const [control, setControl] = useState(initControl);

    const [reload, setReload] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getDeviceData();
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
                    status: data.control.status,
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
            console.log('get device data err: ',err);
        }
    }

    const controlDevice =async (status) => {
        try {
            setLoading(true)
            const url = 'https://smarthome-iot-hust.herokuapp.com/device/control'
            const init =  {...control, status: status};
            const data = {
                control : init,
                deviceId: deviceId
            }
            console.log(data);
             await axios.post(url, data)
             .then (res=> res.data.control)
             .then (data => {
                setControl(data)
             })
             .finally(()=>{
                setReload(reload+1)
             })
            setLoading(false)
        } catch (err) {
            console.log(err);
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
        <StatusView isEnabled={false} setIsEnabled = {()=>controlDevice(true)} ></StatusView>
        </View> 
        // Enable control view
        :<View style={{zIndex: 1}}>
            <Text style={{  fontSize: 20, fontWeight: '500', fontStyle:'italic', marginTop: 40, marginRight:25, marginLeft:22, paddingBottom:5}}>Device: <Text style={{color: 'tomato'}}>          {deviceInfo.deviceName}</Text></Text>
            <View style={{flexDirection:'row', flexWrap:'wrap',  marginTop: 10, padding: 10}}>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20, width: 100, fontWeight: '500', fontStyle:'italic', marginRight:25, marginLeft:10, paddingBottom:5}}>Status:</Text>
                <StatusView isEnabled={true} setIsEnabled = {()=>controlDevice(false)} ></StatusView>
            </View>
            <ControlView
            setControl={setControl}
            control={control}
             type={deviceInfo.deviceType}></ControlView>
            <TouchableOpacity
            onPress={()=>controlDevice(true)}
                     style={{backgroundColor:'#B5D29E', borderRadius: 25, borderColor:'black', height: 40, width:80, justifyContent: 'center', alignSelf: 'center', marginTop:30}}>
                        <Text style={{textAlign: 'center', fontStyle:'italic', fontWeight:'500'}}>Save</Text>
            </TouchableOpacity>
        </View>      
        }
            </>}     
        </SafeAreaView>         
    )
}


const ControlView = ({type, setControl, control}) => {
    const handleControlChange = (field, value) => {
        setControl({...control, [field]: value})
    }
    switch (type) {
        case 'fan':
            return(
                <View>
                    <ModePicker modeOptions={[
          {label: 'Cực mạnh', value: '1'},
          {label: 'Mạnh', value: '2'},
          {label: 'Vừa', value: '3'},
          {label: 'Nhẹ', value: '4'},
          {label: 'Cực nhẹ', value: '5'},
       ]}
       field={'mode'}
       mode = {control.mode}
       setControl = {handleControlChange}
       ></ModePicker>
                    <ControlSlider setControl = {handleControlChange} name={'Speed'} value={control.speed} field={'speed'} max={100}></ControlSlider>
                    <ControlSlider setControl = {handleControlChange} name={'Direction'} value={control.direction} field={'direction'} max={180}></ControlSlider>
                </View>
            )
        case 'air-conditioner':
          

            return(
                <View>
                    <ModePicker mode={control.mode} field={'mode'} 
                      setControl = {handleControlChange}
                    modeOptions={[{label: 'Cool', value: '1'},{label: 'Fan', value: '2'}, {label: 'Dry', value: '3'}]} ></ModePicker>
                    <ControlSlider setControl={handleControlChange}   name={'Speed'} value={control.speed} field={'speed'} max={100}></ControlSlider>
                    <ControlSlider   setControl={handleControlChange} name={'Direction'} value={control.direction} field={'direction'} max={180}></ControlSlider>
                    <ControlSlider   setControl={handleControlChange} name={'Temperature'} value={control.intensity} field={'intensity'} max={100}></ControlSlider>
                </View>
            )
        case 'lightbulb-on': 
            return(
                    <View>
                        <ModePicker
                        mode={control.intensity}
                        field={'intensity'}
                        setControl={handleControlChange} modeOptions={[
                         {label: 'One color', value: '1'},
                         {label: 'Blink', value: '2'},
                         {label: 'Rainbow', value: '3'} ]}></ModePicker>
                        <ControlSlider setControl={handleControlChange}   name={'Intensity'} value={control.speed} field={'speed'} max={100}></ControlSlider>
                        <ColorMode
                        color={control.mode}
                        setControl={handleControlChange}
                        field={'mode'}
                        ></ColorMode>
                    </View>
                )
        default:
            return(
                <View></View>
            )
            break;
    }
}

