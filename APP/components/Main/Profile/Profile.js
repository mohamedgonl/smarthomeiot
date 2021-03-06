import axios from 'axios';
import {StyleSheet,Text, View, ActivityIndicator, Image, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl} from 'react-native'
import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Profile({navigation}){
  
  const [accountId, setAccountId] = useState('');
   AsyncStorage.getItem('accountId',(err,res)=>{
      setAccountId(res)
     })
  const [accountInfo, setAccountInfo] = useState({
      fullname: '',
      phone: ''
  });
  const [loading, setLoading] = useState(false);
 
  const loadAccountInfo = async () => {
    
    try {
    console.log(accountId);
     setLoading(true);
     var url = 'https://smarthome-iot-hust.herokuapp.com/account/'+accountId;
     axios.get(url)
        .then(res => res.data.accountInfo)
        .then(data => {
               setAccountInfo({fullname: data.fullname, phone: data.phone});          
              })
        .finally(()=>{
            setLoading(false) ;
              })
        }
    catch (err) {
      console.log(err);
    }

  }
   useEffect(() => { 
      loadAccountInfo();
    }, [accountId]);



    return(
    <SafeAreaView style={[{flex: 1}]}>
      {loading?<ActivityIndicator style={{flex: 1, justifyContent:'center'}}></ActivityIndicator>
      :<>
      
      <ScrollView
     
      style={[style.container]}>
       
        <View style={{marginBottom: 60}}>
            <Image style={style.userImg} source={require('../../../assets/avatar/meo.jpg')}></Image>
            <Text style={style.userName}>Name: {accountInfo.fullname||'No Infomation'}</Text>
            {/* <Text style={style.email}>Email</Text> */}
            <Text style={style.email}>Phone: {accountInfo.phone||'No Infomation'}</Text>
        </View>
      
           <TouchableOpacity style={[style.button,{backgroundColor: '#F2F4E7'}]}>
            <Text style={style.userBtnTxt}>Edit your profile</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[style.button,{backgroundColor: '#CFE9EC'}]}>
            <View><Text style={style.userBtnTxt}>Change your password</Text></View>
           </TouchableOpacity>
           <TouchableOpacity
            onPress={()=>navigation.navigate('Login')}
            style={[style.button,{backgroundColor: '#EE968D'}]}>
            <View><Text style={style.userBtnTxt}>Logout</Text></View>
           </TouchableOpacity>
        </ScrollView>
      </>}
        </SafeAreaView>
       
    )
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    //  alignItems: 'center',
      paddingTop:80
  
    },
    userImg: {
      height: 150,
      width: 150,
      borderRadius: 75,
      alignSelf: 'center',
      marginBottom: 20
    
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
    
 
    },
    email: {
      fontSize: 18,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    },
    userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
    },
    userBtn: {
      borderColor: '#2e64e5',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
    },
    userBtnTxt: {
      color: '#694BA4',
      fontSize: 14,
      fontWeight: 'bold',
    },
    userInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20,
    },
    userInfoItem: {
      justifyContent: 'center',
    },
    userInfoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    userInfoSubTitle: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
    button: {
        width: "80%",
        backgroundColor: "#fb5b5a",
      //  borderColor: '#2e64e5',
      //  borderWidth: 2,
        borderRadius: 3,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center'
    }
  });