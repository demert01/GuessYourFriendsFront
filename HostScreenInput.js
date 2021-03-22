import React, {Component} from 'react'
import {ActivityIndicator, View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage} from 'react-native'

//const client = require('./Utilities/client');

// Handles text field data from login page and communicates to backend
class HostScreenInput extends Component {
    state = {
        username: '',
        shouldShowActivityIndicator: false
    };

    static async storeUsername(username) {
        try {
            await AsyncStorage.setItem("username", username);
        } catch (error) {
            alert("Something went wrong")
        }
    }

    handleUsername = (text) => {
        this.setState({username: text})
    };

    removeActivityIndicator = () => {
        this.setState({shouldShowActivityIndicator: false});
    };

    login = (username) => {
        this.setState({shouldShowActivityIndicator: true});
        client.post('/api/users/login', {
            username: this.state.username
        })
            .then((response) => {
                this.removeActivityIndicator();

                HostScreenInput.storeUsername(this.state.username)
                    .then(() => {
                        this.navigateToMenu();
                    });
            })
            .catch((error) => {
                this.removeActivityIndicator();
                alert(error.response.data.message || 'Error logging in user with username: ' + username)
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="#FFFFFF" animating={this.state.shouldShowActivityIndicator}/>
                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder="Enter Your Nickname"
                           placeholderTextColor="black"
                           autoCapitalize="none"
                           color= "black"
                           onChangeText={this.handleUsername}/>

            </View>
        )
    }
}

export default HostScreenInput

const styles = StyleSheet.create({
    container: {
        paddingTop: 5
    },
    input: {
        margin: 10,
        height: 60,
        borderColor: '#d12a3b',
        borderWidth: 8,
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '800'
        
    },
    submitButton: {
        backgroundColor: '#d12a3b',
        padding: 10,
        margin: 15,
        height: 50,
        borderRadius: 36,
        
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '800'
    }
})
