import { StatusBar } from "expo-status-bar";
import {Text,View,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,Alert,ActivityIndicator
} from "react-native";
import { useState } from "react";
import axios from 'axios';

export default function Register({ navigation }) {
    const initInfo = {
        username: "",
        password: "",
        fullname: '',
        phone: '',
    }
    const [info, setInfo] = useState(initInfo);
  
    const [loading, setLoading] = useState(false);

    const register = () => {
        setLoading(true);
        try {

            if(info.username =='' || info.password =='') {
                Alert.alert('Please enter username and password');
                setInfo(initInfo)
                setLoading(false);
                return;
            }
            const url = "https://smarthome-iot-hust.herokuapp.com/account";
       
             axios.post(url,info)
               .then(res => res.data)
               .then(data => {
                 
                   if(data['status'] == 'OK') {
                       Alert.alert('Create account success!');
                       setInfo(initInfo);
                       setLoading(false)
                       navigation.navigate('Login');
                   }
                   else{
                       Alert.alert("Account is existed!");
                       setInfo(initInfo)
                       setLoading(false)
                   }
               })
               .catch(err => {
                   setMsg("Something error :(")
                   console.log(err);
                   Alert.alert(err);
               })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={loginStyles.container}>
            {loading?<ActivityIndicator style={{flex:1,justifyContent: 'center'}}></ActivityIndicator>
            :<><StatusBar style="light"></StatusBar>
            <View >
                <Text style={loginStyles.header}>REGISTER</Text>
            </View>
            <View style={loginStyles.inputView}>
                <TextInput style={loginStyles.inputText}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    value={info.username}
                    onChangeText={(text) => setInfo({...info,username: text})} />
            </View>

            <View style={loginStyles.inputView}>
                <TextInput style={loginStyles.inputText}
                    placeholder="Password"
                    value={info.password}
                    placeholderTextColor="#003f5c"
                    secureTextEntry
                    onChangeText={(text) => setInfo({ ...info,password: text})} />
            </View>
            <View style={loginStyles.inputView}>
                <TextInput style={loginStyles.inputText}
                    placeholder="Full name"
                    value={info.fullname}
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setInfo({...info,fullname: text})} />
            </View>
            <View style={loginStyles.inputView}>
                <TextInput style={loginStyles.inputText}
                    placeholder="Phone"
                    keyboardType='numeric'
                    value={info.phone}
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setInfo({...info,phone: text})} />
            </View>
            <TouchableOpacity onPress={() =>register()} style={[loginStyles.loginBtn, {backgroundColor: "#D1C0D8"}]}>
                <Text style={ [loginStyles.loginText, {marginTop: 5}]}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.goBack()}} style={[ loginStyles.loginBtn, { backgroundColor: "#EA6060" }]}>
                <Text style={[ loginStyles.loginText, { marginTop: 5 }]}>CANCLE</Text>
            </TouchableOpacity>
            </>}
            
        </SafeAreaView>
    )
}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header:{
        marginBottom: 20,
        fontSize: 40,
        color: 'white'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#f0f8ff",
        marginBottom: 10
    }
})
