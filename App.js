import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import HostScreen from "./HostScreen";
import Join from './Join';
import RoundScreen from './RoundScreen'
import QuestionScreen from './QuestionScreen';
import RoundResults from './RoundResults';
import GameResults from './GameResults';
import Waiting from './Waiting';
import RoundStandings from './RoundStandings';


const Stack = createStackNavigator();

// Runs the application and includes each screen used for navigation
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="HostScreen" component={HostScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Join" component={Join} options={{ headerShown: false }} />
          <Stack.Screen name="RoundScreen" component={RoundScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RoundResults" component={RoundResults} options={{ headerShown: false }} />
          <Stack.Screen name="GameResults" component={GameResults} options={{ headerShown: false }} />
          <Stack.Screen name="Waiting" component={Waiting} options={{ headerShown: false }} />
          <Stack.Screen name="RoundStandings" component={RoundStandings} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
  );
}
