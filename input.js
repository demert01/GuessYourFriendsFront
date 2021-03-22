import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, TextInput, StyleSheet, } from 'react-native';

class Input extends Component {

  handleCode = (text) => {
    this.setState({code: text})
  };

  handleNickname = (text) => {
    this.setState({nickname: text})
  };

  navigateToWait = () => {
    this.props.navigation.navigate("Waiting");
};

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input1}
          underlineColorAndroid="transparent"
          placeholder="Enter a Lobby Code"
          placeholderTextColor="black"
          autoCapitalize="none"
          color= "black"
          onChangeText={this.handleCode}
        />

        <TextInput
          style={styles.input2}
          underlineColorAndroid="transparent"
          placeholder="Choose a Nickname"
          placeholderTextColor="black"
          autoCapitalize="none"
          color= "black"
          onChangeText={this.handleNickname}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => {navigate('Waiting')}
          }>
          <Text style={styles.submitButtonText}> Enter the Lobby </Text>
         </TouchableOpacity>
      </View>  
    );
  }
}

export default Input

const styles = StyleSheet.create({
  container: {
      paddingTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
  },
  input1: {
      margin: 50,
      height: 50,
      width: 300,
      borderColor: '#ffff00',
      borderWidth: 5,
      textAlign: 'center',
      fontSize: 23,
      fontWeight: '800'
  },
  input2: {
    margin: 0,
    height: 50,
    width: 300,
    borderColor: '#ffff00',
    borderWidth: 5,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '800'
},
  submitButton: {
    backgroundColor: '#ffff00',
    padding: 10,
    margin: 50,
    height: 50,
    borderRadius: 25
  },
  submitButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '800'
  }
})