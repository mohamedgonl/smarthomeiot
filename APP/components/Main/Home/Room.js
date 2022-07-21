
import { SafeAreaView, StyleSheet, Dimensions, View, Text,TouchableOpacity,ScrollView, TextInput, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import {useState, useEffect} from "react";
import {FlatList} from "react-native-gesture-handler";
import * as shape from 'd3-shape'
import {LineChart} from 'react-native-svg-charts'
import IconFoundation from 'react-native-vector-icons/Foundation';
import * as theme from '../../../outsource/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AddModal from "./AddModal";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const width = Dimensions.get('window').width / 2 -10;


const Device = ({device,navigation,roomId,reload}) => {
  device = device.item
  const deviceId = device._id
  const showConfirmDeleteDevice = () => {
    return Alert.alert('Are you sure?','Are you sure delete this device?',
    [{text: 'YES',onPress: ()=>deleteRoom()},{text: 'NO'}]);
  }
  const deleteRoom = async () => {
        
    try {
        const url = 'https://smarthome-iot-hust.herokuapp.com/room/'+roomId+'/'+deviceId;
        await  axios.delete(url)
        .then(res => res.data)
        .then(data => {
            reload();
        })
    } catch (err) {
        console.log(err);
    }
  }
  return ( 
    
  <TouchableOpacity
    onPress={()=>navigation.navigate('Device',deviceId)}
  ><View
    style={styles.card}>
       <TouchableOpacity style={{position:'absolute', right: 0, top: -3}}
            onPress={()=>showConfirmDeleteDevice()}>
                <IconFoundation size={25} color='red' name="x-circle"></IconFoundation>
            </TouchableOpacity>
        <View style={{height: 90, alignItems: "center", justifyContent:'center'}}>
            <Icon size={80} name={device.deviceType.toLowerCase()==""?'new-box':device.deviceType.toLowerCase()} color={'#F16700'}></Icon>
        </View>
        <Text style={{
            alignSelf: 'center',
            marginTop: 15,
            fontWeight: 'bold',
            fontSize: 17
        }}>
           {`${device.deviceName}`}
        </Text>
    </View></TouchableOpacity>)
}


export default function Room ({navigation,route}) {
  const {roomId} = route.params;
  const [devices, setDevices] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('others');
  const [refreshing, setRefreshing] = useState(false);     
  const [items, setItems] = useState([
        {label: 'Air-conditioner', value: 'air-conditioner'},
        {label: 'Fan', value: 'fan'},
        {label: 'Wifi', value: 'wifi'},
        {label: 'Lightburlb', value: 'lightbulb-on'},
        {label: 'Temperature sensor', value: 'temperature-celsius'},
        {label: 'Humidity sensor', value: 'air-humidifier'},
        {label: 'Others', value: 'others'},
     ]);
  const [loading, setLoading] = useState(false);
  const [newDevice, setNewDevice] = useState({
    deviceName: '',
    deviceType: '',
  });
  const [reload, setReload] = useState(0);
  const [visible, setVisible] = useState(false);
  const [temperature, setTemperature] = useState(0);
   const [data, setData] = useState([]);




  useEffect(() => {  
     getRoomData();
    }, [reload]);
  
  const getRoomData = async () => {
        try {
          setLoading(true)
          const url ='https://smarthome-iot-hust.herokuapp.com/room/' +roomId;
          await axios.get(url)
          .then( (res) => res.data)
          .then((data)=> {
             const devices = data.room.devices
             setDevices(devices)
             var tempDevice;
             for(let i = 0; i<devices.length;i++){
                if(devices[i].deviceType == 'temperature-celsius') {
                  tempDevice = devices[i]
                  break;
                } 
             }
             let temp =  parseFloat(tempDevice.data[tempDevice.data.length-1].value) 
             setTemperature(temp.toFixed(1))
             var humiDevice = [];
             for(let i = 0; i<devices.length;i++){
                if(devices[i].deviceType == 'air-humidifier') {
                  humiDevice = (devices[i].data.slice(-10).map(e=>e.value));
                  break;
                }
             }
             humiDevice = humiDevice.map( e => parseFloat(e))
             setData(humiDevice)
          })
          .finally(()=>{
           setLoading(false);
          })
        } catch (err) {
          console.log('get room data err:',err);
        }
    }

    const addNewDevice = async () =>{
      if(newDevice.deviceName == '') Alert.alert('Please input device name');
      else if(newDevice.deviceType == '') Alert.alert('Please select device type');
      else {
      try {
        setLoading(true);
        const url = 'https://smarthome-iot-hust.herokuapp.com/device';
        const data = {
          roomId: roomId,
          deviceInfo : {
            deviceName: newDevice.deviceName,
            deviceType: newDevice.deviceType,
          }
        }
        await axios.post(url, data)
        .then(res=> res.data)
        .then(data =>{
          console.log('add new device response: ',data);
        })
        .finally(()=>{
          setReload(reload+1);
          setLoading(false);
          hide();
        })
      } catch (err) {
          console.log('add new device err: ',err);
      }
    }
  }

    const hide = () => {
        // reset data form
        setOpen(false);
        setValue(null);
        setNewDevice({
          deviceName: '',
          deviceType: '',
        });
        setVisible(false);
      }

      
    return(
        <SafeAreaView
        style={{
          flex: 1,
         // marginLeft: 5,
          marginRight: 5,
          backgroundColor: 'white'
      }}> 
          {loading?<ActivityIndicator style={{justifyContent:'center', flex:1}}></ActivityIndicator>
          :<>      
          <View
             style={{flexDirection:'row', flexWrap:'wrap', margin:10, height: 140}}>
                <View style={{ justifyContent: 'center', flex: 1,flexDirection:'row', flexWrap:'wrap'}}>
                    {}
                    <Text style={{fontSize: 60 ,color: temperature>37?'red':'black'}}>
                    {`${temperature}`}
                    </Text>
                    <Text style={{fontSize: 40,color: temperature>37?'red':'black'}}>
                    °C
                    </Text >
                </View>
              
            <View style={{flex: 1, borderWidth: 1,borderColor: 'black', padding: 5, borderStyle: 'dashed'}}>
                <Text style={{fontSize: 20, textAlign:'center', fontStyle: 'italic' }}>{`Humidity: ${data[data.length-1]||'?'}%`}</Text>
                <LineChart
                    yMax={100}
                    yMin={0}
                  showGrid = {true}
                    data={data}
                   style={{ flex: 1 }}
                   curve={shape.curveBasis}
                   bezier
                   svg={{ stroke: 'rgb(134, 65, 244)'||theme.colors.accent, strokeWidth: 3 }}
            />
            </View>
            </View>
            {/* Devices */}
            <FlatList
           columnWrapperStyle={{justifyContent: 'space-between'}}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{
            marginTop: 20,
            paddingBottom: 90,
           
           }}
           numColumns={2} data={devices} 
           renderItem={(item)=><Device
           device={item}
           reload ={()=>setReload(!reload)}
           roomId={roomId} navigation={navigation}> </Device>
        }   
        refreshControl={<RefreshControl refreshing = {refreshing}
         onRefresh={()=>setReload(reload+1)}></RefreshControl>}></FlatList>
         <View
       style={{
        display: 'flex',
        flexDirection :'column',
        borderRadius: 35,
        position: 'absolute',
        right: 10,
        bottom: 120, 
        backgroundColor: '#F16700'
       }}>  

        <TouchableOpacity onPress={()=>setVisible(true)}>
            <IconEntypo name="plus" size={50} color={'white'} ></IconEntypo>
        </TouchableOpacity>
       
       </View>
       <View
       style={{
        display: 'flex',
        flexDirection :'column',
        borderRadius: 35,
        position: 'absolute',
        right: 10,
        bottom: 180, 
        backgroundColor: '#F16700',
        padding: 5
       }}>  

        <TouchableOpacity onPress={()=>navigation.navigate('QRScanner', {roomId: roomId})}>
            <Icon name="qrcode-scan" size={40} color={'white'} ></Icon>
        </TouchableOpacity>
       
       </View>
      <AddModal
      
      visible={visible}
      hide = {()=>hide()}
      submit={()=>addNewDevice()}
      headerTitle={'Add a new device'}>
            <TextInput placeholder="Device's name"    placeholderTextColor="#003f5c" 
            autoFocus={true} onChangeText={text => setNewDevice({ ...newDevice, deviceName:text})}
            style={{height: 60, borderColor: 'black',borderWidth:1, borderRadius:7, padding: 20, marginTop: 25, marginBottom: 25}}>
            </TextInput>
            <DropDownPicker 
            placeholder='Select device type'
            style= {{marginBottom: 20, height: 60, zIndex:2, paddingLeft: 20}}
            selectedItemLabelStyle={{
                fontWeight: "bold"
              }}
            
            autoScroll={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}

            onSelectItem ={(item) => setNewDevice({ ...newDevice,deviceType: item.value,})}
            setItems={setItems} />
      </AddModal></>
          }
      

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    roomContainer: {
     flexDirection: "row",
     marginTop: 30,
     marginBottom: 20,
     justifyContent: 'space-between'
    },
    roomText: {
     fontSize: 16,
     color: 'grey',
     fontWeight: 'bold',
    },
    roomTextSelected: {
     color: 'green',
     paddingBottom: 5,
     borderBottomWidth: 2,
     borderColor: 'green'
    },
    card: {
     height: 150,
     width,
     marginHorizontal: 5,
     borderRadius: 25,
     marginBottom: 10,
     padding: 15,
    // borderWidth: 1,
     backgroundColor:'#F6F6F6'

   },
   roomName: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle : 'italic',

   }
 
 })
 