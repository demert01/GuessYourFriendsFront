import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ButtonWithBackground from "./button";
import { StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, Platform } from 'react-native';
import Input from './input';

// 
export default class Join extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.carContainer}>

          <ImageBackground
              source={require('./assets/background.png')}
              style={styles.image}
          />
          <ScrollView>
            
            <View style={styles.titles}>
              <Text style={styles.title}>Guess Your</Text>
              <Text style={styles.title}>Friends</Text>
              <Text style={styles.subtitle}>Let's get Judgy</Text>
            </View>

            
            <View style={styles.importantText}>
              <Text style={styles.instruction}>Type in the Game Code</Text>
            </View>

            <Input navigation={this.props.navigation}/>


          </ScrollView>
          
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
  code: {
    marginTop: '20%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carContainer: {
    width: '100%',
    height: '100%',
  },

  button1: {
    marginTop: '80%',
    alignItems: 'center',
    color: '#000000'
},

  titles: {
    width: '100%',
    alignItems: 'center',
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
    position: 'absolute',
  },

  importantText: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center'
  },

  instruction: {
    fontSize: 30,
    fontWeight: '800',
    color: 'white',
    marginTop: 20
  }
});
