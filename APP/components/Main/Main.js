import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import IconFontAwesom from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet,Text, View,} from 'react-native'
import Mic from './Mic/Mic';
import Statis from './Statis/Statis'
import Profile from './Profile/Profile';
import { HomeTabs } from './Home/HomeTabs';
import Weather from './Weather/Weather'




const Tab = createBottomTabNavigator();
export default function Main(){

    return(
        <Tab.Navigator
        initialRouteName="HomeTabs"
       screenOptions={{
           tabBarShowLabel: false,
           headerShown: true ,
           headerTitle: `YOUR SMART HOME` ,
           headerStyle: {
            backgroundColor: '#EAF8F9',
         
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 25,
            color: '#223131'
          },
           tabBarStyle: {
               position: 'absolute',
               bottom: 25,
               left: 20,
               right: 20,
               elevation: 0,
               backgroundColor: '#FFFFFF',
               borderRadius: 15,
               height: 90,
               ...styles.shadow

           }
       }}
        >
            <Tab.Screen name="HomeTabs" component={HomeTabs} options={{tabBarIcon: ({focused}) =>(
                    <View style={{alignItems: 'center', justifyContent:'center', top: 10}}>
                        <IconFontAwesom name="home"  size={25} color = {focused ? '#e32f45' :'#748c94'}/>
                            <Text style={{color:  focused? '#e32f45' :'#748c94', fontSize: 12}} >Home</Text>
                    </View>
                    )}}/>
            <Tab.Screen name="Weather" component={Weather} options={{tabBarIcon: ({focused}) => (
                    <View style={{ alignContent: 'center', justifyContent: 'center', top:10, alignItems:'center'}}>
                     <IconMaterial name="weather-partly-cloudy" size={25} color = {focused ? '#e32f45' :'#748c94'}/>
                    <Text styles={{color: focused?  '#e32f45' :'#748c94', fontSize:12}} >Weather</Text>
                    </View >
                    )}} />
            <Tab.Screen name="Mic" component={Mic} options={{  tabBarIcon: ({focused}) => (
                    <View style={{ alignContent: 'center', justifyContent: 'center', top:10, alignItems:'center' }}>
                        <IconEntypo name="mic"  size={25}  color = {focused ? '#e32f45' :'#748c94'}/>
                        <Text styles={{color: focused?  '#e32f45' :'#748c94', fontSize:12}} >Mic</Text>
                    </View  >
                )}}/>
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ({focused}) => (
                    <View style={{alignContent: 'center', justifyContent: 'center', top:10, alignItems:'center'}}>
                        <IconAntDesign name="user" size={25} color = {focused ? '#e32f45' :'#748c94'}/>
                        <Text styles={{color: focused?  '#e32f45' :'#748c94', fontSize:12 }} >Profile</Text>
                    </View>
                    )}}/>  
        </Tab.Navigator>
    )
}


const styles =StyleSheet.create({
    shadow : {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5 
    }
})