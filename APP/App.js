


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import Login from './components/Log/Login';
import Register from './components/Log/Register';
import React from 'react'
import LandingPage from './components/LandingPage/Landing'
import Main from './components/Main/Main'

// const MainNavigator = createStackNavigator({
  
//    Tabs :{screen: Tabs}, 
//    Login: {screen: Login}, Register: {screen: Register},
   
// },
// {
//   headerMode: 'none',
//   navigationOptions: {
//       headerVisible: false,
//   }
// });
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
};




