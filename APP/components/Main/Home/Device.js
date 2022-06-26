import {Text, View, SafeAreaView} from 'react-native'
import {useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {ColorMode,ControlSlider,ModePicker,StatusView} from './ControlComponents'

export default function Device(){
    const [deviceInfo, setDeviceInfo] = useState({
        deviceName: 'Quạt siêu xịn',
        deviceType: 'Light'
    });
    const [control, setControl] = useState({
        status: false,
        mode :'',
        direction: 80,
        speed : 21,
        intensity: 100
    });
    return(
        <SafeAreaView style={{flex: 1, marginBottom: 110, paddingBottom: 50}}>
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
        
        </SafeAreaView>
       
           
    )
}


const ControlView = ({type, control}) => {
    switch (type) {
        case 'Fan':
            return(
                <View>
                    <ModePicker></ModePicker>
                    <ControlSlider name={'Speed'} value={control.speed} max={100}></ControlSlider>
                    <ControlSlider name={'Direction'} value={control.direction} max={180}></ControlSlider>
                </View>
            )
        case 'Air-conditioner':
            return(
                <View>
                    <ModePicker></ModePicker>
                    <ControlSlider name={'Speed'} value={control.speed} max={100}></ControlSlider>
                    <ControlSlider name={'Direction'} value={control.direction} max={180}></ControlSlider>
                    <ControlSlider name={'Temperature'} value={control.intensity} max={100}></ControlSlider>
                </View>
            )
        case 'Light':
            return(
                    <View>
                        <ModePicker></ModePicker>
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

