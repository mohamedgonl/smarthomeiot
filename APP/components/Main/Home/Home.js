import {Image,Text,View,StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, ActivityIndicator, RefreshControl, Alert} from "react-native";
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFoundation from 'react-native-vector-icons/Foundation';
import COLORS from '../../../assets/colors/color'
import {useState, useEffect} from "react";
import {FlatList, TextInput} from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddModal from "./AddModal";
import axios, { Axios } from "axios";
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



const Room = ({room,navigation,reload,homeId}) => {
      const roomId = room.item._id;
      const showConfirmDeleteRoom = () => {
        return Alert.alert('Are you sure?','Are you sure delete this room?',
        [{text: 'YES',onPress: ()=>deleteRoom()},{text: 'NO'}]);
      }
      const deleteRoom = async () => {
        
        try {
            const url = 'https://smarthome-iot-hust.herokuapp.com/home/deleteroom/'+homeId+'/'+roomId;
            await  axios.delete(url)
            .then(res => res.data)
            .then(data => {
                console.log('delete room response: ',data);
                reload();
            })
        } catch (err) {
            console.log(err);
        }
      }
      return ( 
      <TouchableOpacity
        onPress={()=>{navigation.navigate('Room',{roomId: roomId})}}
      ><View
        style={styles.card}>
            <TouchableOpacity style={{position:'absolute', right: 0, top: -3}}
            onPress={()=>showConfirmDeleteRoom()}>
                <IconFoundation size={25} color='red' name="x-circle"></IconFoundation>
            </TouchableOpacity>
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
               {room.item.name||'Unnamed Room'}
            </Text>
            <Text style={{
                alignSelf: 'center',
                marginTop: 5,
                fontSize: 15,
                color: 'grey'
            }}>
               {/* {`${room.devices.length} x deivces`} */}
            </Text>
        </View></TouchableOpacity>)
    }

export default function Home({navigation}) { 

    const [accountId, setAccountId] = useState('');
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [visible, setVisible] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [homeId, setHomeId] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [reload, setReload] = useState(0);

    const getHomeInfo = async () => {
        try {
            await AsyncStorage.getItem('accountId', (err,res)=>{
                setAccountId(res)
            });
            setLoading(true);
            var url = 'https://smarthome-iot-hust.herokuapp.com/home/'+ accountId;
              axios.get(url)
            .then(res => res.data)
            .then(data => data.home)
            .then(home => {
                AsyncStorage.setItem('homeId', home._id);
                setRooms(home.rooms)     
            })
            .finally(()=>{
                setLoading(false);
             //   setReload(reload++);
            })
        } catch (err) {
           console.log(err); 
        }
    }
     useEffect(() => {
            getHomeInfo();
        }, [reload,accountId]);

    const addNewRoom = async () => {
        if(newRoomName== '') Alert.alert('Please enter room name');
        else
        try { 
            await AsyncStorage.getItem('homeId',(err,res)=>{
                setHomeId(res);
            })
            setLoading(true);          
            const url = 'https://smarthome-iot-hust.herokuapp.com/room';   
           
            const  data = {
                homeId : homeId,
                roomInfo : {
                    name: newRoomName
                }
            } 
          //  console.log('POST: ',data);       
            await axios.post(url, data)
            .then(res => res.data)
            .then(data => {
                console.log(data);
            })
            .finally(()=>{
                console.log('add new room');
                setLoading(false);
                setVisible(false);
                setNewRoomName(null);
                setReload(reload+1);
            })
        } catch (err) {
            console.log(err);
        }
    }
    
        
    return (
        <SafeAreaView
        style={{
            flex: 1,
           // marginLeft: 5,
            marginRight: 5,
            backgroundColor: 'white'
        }}>
            {loading?<ActivityIndicator style={{flex:1, justifyContent:'center'}}></ActivityIndicator>
            :<>
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
           room={item} 
           homeId = {homeId}
           reload ={()=>setReload(!reload)}>
            </Room>
        }
         refreshControl={<RefreshControl refreshing = {refreshing}
         onRefresh={()=>setReload(reload+1)}></RefreshControl>}
        />
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
            autoFocus={true} onChangeText={text => setNewRoomName(text)}
            style={{height: 60, borderColor: 'black',borderWidth:1, borderRadius:25, padding: 20, marginTop: 25, marginBottom: 25}}>
            </TextInput>
        </AddModal>
        </>}
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
