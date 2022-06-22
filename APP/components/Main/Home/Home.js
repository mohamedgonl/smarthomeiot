import {Image,Text,View,StyleSheet,SafeAreaView,TouchableOpacity, Dimensions} from "react-native";
import IconEntypo from 'react-native-vector-icons/Entypo';
import COLORS from '../../../assets/colors/color'
import {useState, useEffect} from "react";
import {FlatList} from "react-native-gesture-handler";
const width = Dimensions.get('window').width / 2 - 10;
const imgRoom = (name) => {
    switch (name) {
        case 'Livingroom':
            return require('../../../assets/rooms/livingroom.jpg')
            break;
        case 'Kitchen':
            return require('../../../assets/rooms/kitchen.jpg')
            break;
        case 'Bedroom':
                return require('../../../assets/rooms/bedroom.jpg')
                break;
        case 'Bathroom':
                return require('../../../assets/rooms/bathroom.jpg')
                break;
        case 'Washingroom':
                    return require('../../../assets/rooms/bathroom.jpg')
                    break;
        case 'Gymroom':
                    return require('../../../assets/rooms/gymroom.jpg')
                    break;
        default:
                return require('../../../assets/rooms/another.jpg')
            break;
    }
} 

const rooms = [{
    name: 'Kitchen',
    devices: [
        1,2,3,4
    ]
},
{
    name: 'Livingroom',
    devices: [
        1,2,3,4
    ]
},
{
    name: 'Bedroom',
    devices: [
        1,2,3,4
    ]
},{
    name: 'Gymroom',
    devices: [
        1,2,3,4
    ]
},

{
    name: 'Bathroom'
},
{
    name: 'Room'
}, {
    name: 'Kitchen'
},
]


export default function Home({navigation}) { 

    const Room = ({room}) => {
        const devices = room.item.devices
        console.log(devices);
      return ( 
      <TouchableOpacity
        onPress={()=>navigation.navigate('Room',room)}
      ><View
        style={styles.card}>
            <View style={{height: 110, alignItems: "center"}}>
                <Image
                style= {{flex:1, resizeMode:'contain',maxWidth:'100%'}}
                source={imgRoom(room.item.name)}
                />
            </View>
            <Text style={{
                alignSelf: 'center',
                marginTop: 15,
                fontWeight: 'bold',
                fontSize: 17
            }}>
               {`${room.item.name}`}
            </Text>
            <Text style={{
                alignSelf: 'center',
                marginTop: 5,
                fontSize: 15,
                color: 'grey'
            }}>
               {`${devices?devices.length:0} x deivces`}
            </Text>
        </View></TouchableOpacity>)
    }

   
        
    return (
        <SafeAreaView
        style={{
            flex: 1,
            marginLeft: 5,
            marginRight: 5,
            backgroundColor: 'white'
        }}>
           <FlatList
           columnWrapperStyle={{justifyContent: 'space-between'}}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 90,
            marginLeft: 0,
            marginRight: 0
           }}
           numColumns={2} data={rooms} 
           renderItem={(item)=><Room
           room={item}>

           </Room>
        }></FlatList>
       <View
       style={{
        display: 'flex',
        flexDirection :'column',
        borderRadius: 25,
        position: 'absolute',
        right: 10,
        bottom: 150, 
        backgroundColor: 'pink'
       }}>  

        <TouchableOpacity>
            <IconEntypo name="plus" size={40} color={'white'} ></IconEntypo>
        </TouchableOpacity>
       
       </View>
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
