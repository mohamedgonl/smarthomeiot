
import { SafeAreaView, StyleSheet, Dimensions, View, Text,TouchableOpacity, Image } from 'react-native';
import COLORS from '../../../assets/colors/color';
import {useState, useEffect} from "react";
import {FlatList} from "react-native-gesture-handler";
const width = Dimensions.get('window').width / 2 - 10;

const Device = ({device}) => {
  
  return ( 
  <TouchableOpacity
    onPress={()=>navigation.navigate('Device',deivce)}
  ><View
    style={styles.card}>
        <View style={{height: 110, alignItems: "center"}}>
            <Image
            style= {{flex:1, resizeMode:'contain',maxWidth:'100%'}}
            source={''}
            />
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

export default function Room () {
    const roomName = "Bedroom";
    const temperature = '34';
    const devices = [{
        deviceName: 'Quạt siêu xịn',
        deviceType: 'Fan',
    },
    {
        deviceName: 'Quạt siêu xịn',
        deviceType: 'Fan',
    },
    {
        deviceName: 'Quạt siêu xịn',
        deviceType: 'Fan',
    },
    {
        deviceName: 'Quạt siêu xịn',
        deviceType: 'Fan',
    },
    {
        deviceName: 'Quạt siêu xịn',
        deviceType: 'Fan',
    }]
    
    return(
        <SafeAreaView>
            {/* Name room */}
            <View>
                <Text>
                    {`${roomName}`}
                </Text>
            </View>
            {/* Temp and humi */}
            <View>
                <View>
                <Text>
                    {`${temperature}`}
                </Text>
                <Text>
                    °C
                </Text>
                </View>
                <View>

                </View>
            </View>
            {/* Devices */}
            <FlatList
           columnWrapperStyle={{justifyContent: 'space-between'}}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 90,
            marginLeft: 0,
            marginRight: 0
           }}
           numColumns={2} data={devices} 
           renderItem={(item)=><Device
           device={item}>

           </Device>
        }></FlatList>

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
     height: 200,
     backgroundColor: COLORS.light,
     width,
     marginHorizontal: 5,
     borderRadius: 10,
     marginBottom: 10,
     padding: 15,
   },
 
 })
 