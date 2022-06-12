import { StatusBar } from "expo-status-bar";
import {Text,View,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,Alert
} from "react-native";
import { useState } from "react";
import axios from 'axios';

export default function Register({ navigation }) {

    const [info, setInfo] = useState({
        username: "",
        password: "",
        fullname: '',
        phone: '',
    });
  


    const register = () => {
        console.log(info);
     if(!info.username || !info.password) {
         Alert.alert('Please enter username and password');
         return;
     }
     const url = "https://smart-home-iot-rhust.herokuapp.com/log/register";

      axios.post(url,info)
        .then(res => res.data)
        .then(data => {
            console.log(data);
            if(data['status'] == 'OK') {
                Alert.alert('Create account success!');
                navigation.navigate('Login');
            }
            else{
                Alert.alert("Account is existed!");
            }
        })
        .catch(err => {
            setMsg("Something error :(")
            console.log(err);
            Alert.alert(err);
        })
    }

    return (
        <SafeAreaView style={
            loginStyles.container
        }>
            <StatusBar style="light"></StatusBar>
            <View >
                <Text style={loginStyles.header}>REGISTER</Text>
            </View>
            <View style={
                loginStyles.inputView
            }>
                <TextInput style={
                    loginStyles.inputText
                }
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={
                        (text) => setInfo({
                            ...info,
                            username: text
                        })
                    } />
            </View>

            <View style={
                loginStyles.inputView
            }>
                <TextInput style={
                    loginStyles.inputText
                }
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry
                    onChangeText={
                        (text) => setInfo({
                            ...info,
                            password: text
                        })
                    } />
            </View>
            <View style={
                loginStyles.inputView
            }>
                <TextInput style={
                    loginStyles.inputText
                }
                    placeholder="Full name"
                    placeholderTextColor="#003f5c"

                    onChangeText={
                        (text) => setInfo({
                            ...info,
                            fullname: text
                        })
                    } />
            </View>
            <View style={
                loginStyles.inputView
            }>
                <TextInput style={
                    loginStyles.inputText
                }
                    placeholder="Phone"
                    placeholderTextColor="#003f5c"

                    onChangeText={
                        (text) => setInfo({
                            ...info,
                            phone: text
                        })
                    } />
            </View>
         


            <TouchableOpacity onPress={
                () => {
                    register()
                }
            }
                style={
                    [
                        loginStyles.loginBtn, {
                            backgroundColor: "#D1C0D8"
                        }
                    ]
                }>

                <Text style={
                    [
                        loginStyles.loginText, {
                            marginTop: 5
                        }
                    ]
                }>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={
                () => {
                   navigation.goBack()
                }
            }
                style={
                    [
                        loginStyles.loginBtn, {
                            backgroundColor: "#EA6060"
                        }
                    ]
                }>

                <Text style={
                    [
                        loginStyles.loginText, {
                            marginTop: 5
                        }
                    ]
                }>CANCLE</Text>
            </TouchableOpacity>
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
