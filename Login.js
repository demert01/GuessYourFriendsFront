import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, FlatList } from 'react-native';
import InputLogin from './InputLogin.js'

// Displays Login Screen
export default class Login extends React.Component {
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
                <Text style={styles.title}>Badger Bytes</Text>
                <Text style={styles.subtitle}>Get Your Grub On</Text>
              </View>

              <View style={styles.importantText}>
                <Text style={styles.instruction}>Login</Text>
              </View>
              
              <InputLogin navigation={this.props.navigation}/>
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
  }
});
