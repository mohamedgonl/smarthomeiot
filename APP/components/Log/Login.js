import {StatusBar} from "expo-status-bar";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from "react";
import axios from 'axios';
import {MaterialCommunityIcons} from '@expo/vector-icons';


export default function Login({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async  () => {
        try {
        setLoading(true);
        if (username =="" || password == "") {
            Alert.alert("Please enter username and password!");
            setUsername('')
            setPassword('')
            setLoading(false);
            return;
        }
        const url = 'https://smarthome-iot-hust.herokuapp.com/account/login'
        await   axios.post(url, {
            username: username,
            password: password
        })
        .then(res => res.data)
        .then((data) => {
            if (data.status == "OK") {
                AsyncStorage.setItem('accountId',data.accountId);
                navigation.navigate('Main');
            } else {
                Alert.alert("Username or password is wrong!")
                
            }
        }).catch(err => {
            console.log(err);
            Alert.alert("Something error :(")
        })
        .finally(()=>{
                setUsername('')
                setPassword('')
                setLoading(false);
        })
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView style={loginStyles.container}>
            {
            loading
            ?<ActivityIndicator style={{flex:1,justifyContent: 'center'}}></ActivityIndicator>
            :<>
            <StatusBar style="light"></StatusBar>
            <View style={loginStyles.logo}>
                <MaterialCommunityIcons name="home-automation" size={100} color="white"/>
                <Text style={loginStyles.text}>Smart Home</Text>
            </View>

            <View style={loginStyles.inputView}>
                <TextInput style={loginStyles.inputText}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    value={username}
                    onChangeText={(text) => setUsername(text)}/>
            </View>

            <View style={loginStyles.inputView}>
                <TextInput style={loginStyles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}/>
            </View>

            <TouchableOpacity>
                <Text style={loginStyles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={loginStyles.loginBtn} onPress={() => login()}>
                <Text style={loginStyles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[loginStyles.loginBtn, { backgroundColor: "#D1C0D8"}]}
                onPress={() => navigation.navigate('Register')}>
                <Text style={[loginStyles.loginText, {marginTop: 5}]}>REGISTER</Text>
            </TouchableOpacity>
            </>
            }    
        </SafeAreaView>
    )
}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    logo: {
        marginTop: 120,
        color: "#f0f8ff",
        marginBottom: 40,
        justifyItem: 'center',
        alignItems: 'center'
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
