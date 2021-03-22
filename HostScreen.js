import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ButtonWithBackground from "./button";
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import HostScreenInput from './HostScreenInput.js';

// Displays Login Screen
export default class HostScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (  
        <View style={styles.container}>
          <View style={styles.carContainer}>
 
            <ImageBackground 
                source={require('./assets/background.png')}
                style={styles.image}
            />

              <View style={styles.titles}>
                <Text style={styles.title}>Guess Your Friends</Text>
                <Text style={styles.subtitle}>Placeholder</Text>
              </View>

              <View style={styles.importantText}>
                <Text style={styles.instruction}>Your Lobby Code:</Text>
              </View>

              <HostScreenInput navigation ={this.props.navigation}/>

            <View style={styles.button}>
              <ButtonWithBackground onPress={() => {navigate('RoundScreen')}} text='Start the Game!' color = '#000000'/>         
            </View>
          </View>
          <StatusBar style="auto" />
          
        </View>
      
    );
  }
}

// Formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carContainer: {
    width: '100%',
    height: '100%',
  },

  titles: {
    width: '100%',
    alignItems: 'center',
    //backgroundColor: '#d12a3b'
  },

  title: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white'
  },
  
  subtitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700'
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute'
  },

  importantText: {
    marginTop: '10%',
    width: '100%',
    alignItems: 'center'
  },

  instruction: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    marginTop: 27
  },

  button: {
    marginTop: '60%',
    alignItems: 'center',
    color: '#000000'
  }
});
