import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Signup from "./Signup";
import Login from './Login';
import RoundScreen from './RoundScreen';
import QuestionScreen from './QuestionScreen';
import RoundResults from './RoundResults';
import GameResults from './RoundResults';

const Stack = createStackNavigator();

// Runs the application and includes each screen used for navigation
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
          <Stack.Screen name="RoundScreen" component={RoundScreen} options={{ headerShown: true }} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{ headerShown: true }} />
          <Stack.Screen name="RoundResults" component={RoundResults} options={{ headerShown: true }} />
          <Stack.Screen name="GameResults" component={GameResults} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
