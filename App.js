import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Login } from './Components/Login';
import { BotNav } from './Routes/Routes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Imgur oauth" component={Login} />
        <Stack.Screen name="Home" component={BotNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}