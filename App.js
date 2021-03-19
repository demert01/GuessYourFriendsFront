import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Host from "./Host";
import Join from './Join';

const Stack = createStackNavigator();

// Runs the application and includes each screen used for navigation
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Host" component={Signup} options={{ headerShown: true }} />
          <Stack.Screen name="Join" component={Login} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
