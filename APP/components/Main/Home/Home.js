import {Image,Text,View,StyleSheet,SafeAreaView,TouchableOpacity, Dimensions} from "react-native";
import IconEntypo from 'react-native-vector-icons/Entypo';
import COLORS from '../../../assets/colors/color'
import {useState, useEffect} from "react";
import {FlatList, TextInput} from "react-native-gesture-handler";
import AddModal from "./AddModal";
const width = Dimensions.get('window').width / 2 - 10;
const imgRoom = (name) => {
    switch (name) {
        case 'Livingroom':
            return require( '../../../assets/rooms/livingroom.jpg')
        case 'Kitchen':
            return require( '../../../assets/rooms/kitchen.jpg')
        case 'Bedroom':
            return require( '../../../assets/rooms/bedroom.jpg')
        case 'Bathroom':
            return require( '../../../assets/rooms/bathroom.jpg')
        case 'Gymroom':
            return require( '../../../assets/rooms/gymroom.jpg')
        default:
            return require('../../../assets/rooms/another.jpg')
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

const Room = ({room,navigation}) => {
    const devices = room.item.devices
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

export default function Home({navigation}) { 

    const [visible, setVisible] = useState(false);
    const [newRoom, setNewRoom] = useState({
        name: ''
    });
    const addNewRoom = () => {
        console.log(newRoom);
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
           renderItem={(item)=><Room navigation ={navigation}
           room={item}>

           </Room>
        }></FlatList>
       <View
       style={{
        display: 'flex',
        flexDirection :'column',
        borderRadius: 35,
        position: 'absolute',
        right: 10,
        bottom: 130, 
        backgroundColor: 'pink'
       }}>  

        <TouchableOpacity onPress={()=>setVisible(true)}>
            <IconEntypo name="plus" size={50} color={'white'} ></IconEntypo>
        </TouchableOpacity>
       
       </View>
      <AddModal
      visible={visible}
      hide = {()=>{setVisible(false)}}
       submit= {()=>addNewRoom()}
      headerTitle={'Add a new room'}>
            <TextInput placeholder="Room's name"    placeholderTextColor="#003f5c" 
            autoFocus={true} onChangeText={text => setNewRoom({name: text})}
            style={{height: 60, borderColor: 'black',borderWidth:1, borderRadius:25, padding: 20, marginTop: 25, marginBottom: 25}}>
            </TextInput>
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
    height: 200,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },

})
