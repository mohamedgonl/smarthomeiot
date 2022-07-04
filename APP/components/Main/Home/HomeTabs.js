import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import Home from "./Home";
import Room from './Room'
import Device from './Device'
import QRScanner from './QRScanner';

const Tab = createNativeStackNavigator();

export function HomeTabs ({navigation}) {
    return (
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Room" component={Room}  />
            <Tab.Screen name='QRScanner' component={QRScanner}/>
            <Tab.Screen name="Device" component={Device} />
        </Tab.Navigator>
    )
}