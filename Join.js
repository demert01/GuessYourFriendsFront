import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import Input from './Input.js'

// 
export default class Signup extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.carContainer}>

          <ImageBackground
              source={require('./assets/Background.png')}
              style={styles.image}
          />
          <ScrollView>
            
            <View style={styles.titles}>
              <Text style={styles.title}>Guess Your Friends</Text>
              <Text style={styles.subtitle}>Placeholder</Text>
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

  carContainer: {
    width: '100%',
    height: '100%',
  },

  titles: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#d12a3b'
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
    position: 'absolute',
  },

  importantText: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center'
  },

  instruction: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    marginTop: 27
  }
});
