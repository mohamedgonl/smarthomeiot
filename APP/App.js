

import {createStackNavigator} from 'react-navigation-stack';
import {NavigationContainer} from '@react-navigation/native'
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Tabs from './components/Tabs';
import { createAppContainer } from 'react-navigation';
import Room from './components/Room';

const MainNavigator = createStackNavigator({
  Login: {screen: Login}, 
   Tabs :{screen: Tabs}, 
   
   Register: {screen: Register},
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

const App = createAppContainer(MainNavigator);



export default App;

