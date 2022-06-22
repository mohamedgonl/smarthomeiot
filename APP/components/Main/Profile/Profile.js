import {StyleSheet,Text, View, Touchable, Image, TouchableOpacity} from 'react-native'

export default function Profile(){
    return(
        <View style={style.container}>
           <View style={{width: 120, height: 120}}>
            <Image style={style.avatar} source={require('../../../assets/avatar/meo.jpg')}></Image>
           </View>
           <View><Text>Name</Text></View>
           <View><Text>Email</Text></View>
           <TouchableOpacity>
            <View><Text>Edit your profile</Text></View>
           </TouchableOpacity>
           <TouchableOpacity>
            <View><Text>Change your password</Text></View>
           </TouchableOpacity>
           <TouchableOpacity>
            <View><Text>Logout</Text></View>
           </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    avatar: {
        resizeMode: 'contain',
    }
})