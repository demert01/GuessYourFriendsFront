import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ButtonWithBackground from "./button.js";
import BackButtonWithBackground from "./BackButton.js";
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import HostScreenInput from './HostScreenInput.js';
import QuestionSelections from './QuestionSelections.js';
import { ScrollView } from 'react-native-gesture-handler';

// Displays Login Screen
export default class HostScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (  
        <View style={styles.container}>
          
          <View style={styles.screenContainer}>
 
            <ImageBackground 
                source={require('./assets/background.png')}
                style={styles.image}
            />
            
            <View style={styles.titles}>
                <Image style={styles.logo}
                source={require('./assets/NewLogo2.png')}
                />
            </View>              

            <HostScreenInput navigation ={this.props.navigation}/>

            <View style={styles.backbutton}>
              <BackButtonWithBackground onPress={() => {navigate('Home')}} text='Return To Home' color='#ff2e63' />
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

  screenContainer: {
    width: '100%',
    height: '100%',
  },

  titles: {
    width: '100%',
    alignItems: 'center',
    marginTop: '20%'
  },

  title: {
    fontSize: 50,
    fontWeight: '900',
    color: 'white'
  },

  subtitle: {
    fontSize: 25,
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
    marginTop: '5%',
    width: '100%',
    alignItems: 'center'
  },

  instruction: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    marginTop: 10
  },

  backbutton: {
    color: '#000000',
    width: 100,
    marginHorizontal: '8%'
  },

  button: {
    marginTop: '10%',
    alignItems: 'center',
    color: '#000000'
  }
});
