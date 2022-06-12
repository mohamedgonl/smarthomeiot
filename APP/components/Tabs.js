import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Dashboard from './Dashboard';
import IconFontAwesom from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {StyleSheet,Text, View,} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mic from './Mic';
import Statis from './Statis'
import Profile from './Profile';
import Room from './Room';




const Stack = createNativeStackNavigator();
const Home = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} options={{
                headerShown: false
            }} />
            <Stack.Screen name='Room' component={Room} options={{
                headerShown: false
            }}/>
            
            
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const Tabs = () => {

    return(
    <NavigationContainer>
        <Tab.Navigator
       screenOptions={{
           tabBarShowLabel: false,
           headerShown: true ,
           headerTitle: `YOUR SMART HOME` ,
           headerStyle: {
            backgroundColor: 'pink',
         
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
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
            <Tab.Screen name="Home" component={Home} options={
                {
                    tabBarIcon: ({focused}) =>(
                        <View style={{
                            alignItems: 'center', justifyContent:'center', top: 10
                        }}>
                           <IconFontAwesom name="home" 
                            
                          size={25}
                                color = {focused ? '#e32f45' :'#748c94'}

                             />
                            <Text style={{
                                color:  focused? '#e32f45' :'#748c94',
                                fontSize: 12
                            }} >Home</Text>
                        </View>
                    )
                }
            } />
            <Tab.Screen name="Statics" component={Statis}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{
                        alignContent: 'center', justifyContent: 'center', top:10, alignItems:'center'
                    }}>
                     <IconAntDesign name="linechart" 
                            
                            size={25}
                                  color = {focused ? '#e32f45' :'#748c94'}
  
                               />
        
                       <Text styles={{
                           color: focused?  '#e32f45' :'#748c94', fontSize:12
                    }} >Statis</Text>
                    </View  >
                )
            }} />
            <Tab.Screen name="Mic" component={Mic}
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{
                        alignContent: 'center', justifyContent: 'center', top:10, alignItems:'center'
                    }}>
                      <IconEntypo name="mic" 
                            
                            size={25}
                                  color = {focused ? '#e32f45' :'#748c94'}
  
                               />
        
                       <Text styles={{
                           color: focused?  '#e32f45' :'#748c94', fontSize:12
                    }} >
                        Mic
                    </Text>
                    </View  >
                )
            }}
            />
                <Tab.Screen name="Setting" component={Profile}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{
                        alignContent: 'center', justifyContent: 'center', top:10, alignItems:'center'
                    }}>
                     <IconAntDesign name="user" 
                            
                            size={25}
                                  color = {focused ? '#e32f45' :'#748c94'}
  
                               />
        
                       <Text styles={{
                           color: focused?  '#e32f45' :'#748c94', fontSize:12
                    }} >Profile</Text>
                    </View  >
                )
            }} />
            
        </Tab.Navigator>
        </NavigationContainer>
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
export default Tabs