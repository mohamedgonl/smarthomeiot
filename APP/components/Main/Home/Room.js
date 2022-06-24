
import { SafeAreaView, StyleSheet, Dimensions, View, Text,TouchableOpacity, TextInput } from 'react-native';
import {useState, useEffect} from "react";
import {FlatList} from "react-native-gesture-handler";
import * as shape from 'd3-shape'
import { LineChart } from 'react-native-svg-charts'
import * as theme from '../../../outsource/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AddModal from "./AddModal";
import DropDownPicker from 'react-native-dropdown-picker';
const width = Dimensions.get('window').width / 2 -10;


const Device = ({device,navigation}) => {
  device = device.item
  return ( 
    
  <TouchableOpacity
    onPress={()=>navigation.navigate('Device')}
  ><View
    style={styles.card}>
        <View style={{height: 90, alignItems: "center", justifyContent:'center'}}>
            <Icon size={80} name={device.deviceType.toLowerCase()} color={'#F16700'}></Icon>
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

export default function Room ({navigation}) {
    const roomName = "Bedroom";
    const temperature = '34';
    const [visible, setVisible] = useState(false);
    const devices = [{
        deviceName: 'Quạt siêu xịn',
        deviceType: 'Fan',
    },
    {
        deviceName: 'Wifi siêu xịn',
        deviceType: 'Wifi',
    },
    {
        deviceName: 'Điều hòa siêu xịn',
        deviceType: 'air-conditioner',
    },
    {
        deviceName: 'Đèn siêu xịn',
        deviceType: 'lightbulb-on-outline',
    },
    {
        deviceName: 'Thiết bị mới',
        deviceType: 'new-box',
    }]
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };
    return(
        <SafeAreaView>
         
            <View style={{flexDirection:'row', flexWrap:'wrap', margin:10}}>
                <View style={{ justifyContent: 'center', flex: 1,flexDirection:'row', flexWrap:'wrap',}}>
                    <Text style={{fontSize: 100}}>
                    {`${temperature}`}
                    </Text>
                    <Text style={{fontSize: 40}}>
                    °C
                    </Text >
                </View>
              
            <View style={{flex: 1}}>
                <Text style={{fontSize: 20, textAlign:'center', fontStyle: 'italic' }}>Humidity</Text>
                <LineChart
                 yMax={100}
                 yMin={0}
                 data={data.datasets}
                style={{ flex: 1 }}
                curve={shape.curveBasis}
                bezier
                svg={{ stroke: theme.colors.accent, strokeWidth: 3 }}
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
           device={item} navigation={navigation}>

           </Device>
        }></FlatList>
         <View
       style={{
        display: 'flex',
        flexDirection :'column',
        borderRadius: 25,
        position: 'absolute',
        right: 10,
        bottom: 150, 
        backgroundColor: '#F16700'
       }}>  

        <TouchableOpacity onPress={()=>setVisible(true)}>
            <IconEntypo name="plus" size={40} color={'white'} ></IconEntypo>
        </TouchableOpacity>
       
       </View>
      <AddModal
      visible={visible}
      info = {''}
      hide = {()=>{setVisible(false)}}
      api = {``}
      headerTitle={'Add a new device'}>
            <TextInput placeholder="Device's name"    placeholderTextColor="#003f5c" 
            autoFocus={true} onChangeText={text => setNewRoom(text)}
            style={{height: 60, borderColor: 'black',borderWidth:1, borderRadius:7, padding: 20, marginTop: 25, marginBottom: 25}}>
            </TextInput>
            <DropDownPicker open={false}
            style= {{marginBottom: 20, height: 60}}
             items={['Fan', 'Wifi', 'Air-Conditioner', 'Lightburb', 'Others']}
             setOpen={()=>{open=true}} />
      </AddModal>

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
 