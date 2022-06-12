import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react'
export default function Home({navigation}) {
    const [homeID, setHomeID] = useState('');

    const active = () => {}


    return (
        <View style={
            styles.container
        }>
            <Image source={
                    require("../assets/logo.png")
                }
                style={
                    styles.logo
                }
                resizeMode="contain"/>
            <Text style={
                styles.header
            }>Getting Started</Text>
            <Text style={
                styles.description
            }>Input your home ID to active account</Text>
       

        <View style={
            styles.direct
        }>
            <TouchableOpacity style={
                    [
                        styles.startBtn, {
                            backgroundColor: 'red'
                        }
                    ]
                }
                onPress={
                    () => {
                        navigation.goBack()
                    }
            }>
                <Text style={
                    [styles.startText]
                }>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={
                    styles.startBtn
                }
                onPress={
                    () => {}
            }>
                <Text style={
                    styles.startText
                }>OK</Text>
            </TouchableOpacity>
        </View>


    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',

    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#375177",
        marginBottom: 10
    },
    description: {
        fontSize: 15,
        color: "gray",
        padding: 5
    },
    startBtn: {
        backgroundColor: "#90bdff",
        borderRadius: 50,
        padding: 10,
        margin: 10,
        width: '25%',
        alignItems: 'center'
    },
    startText: {
        color: "white"
    },
    direct: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    input: {

        width: '50%',
        height: 50,
        alignItems: "center",
        textAlign: 'center',
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: '1',
        borderRadius: '20'
    },
    logo: {
        width: "80%",
        height: "30%",
        marginTop: '35%'
    }
});
