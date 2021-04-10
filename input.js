import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, TextInput, StyleSheet,} from 'react-native';
import GameAPI from './API/Game/GameAPI'
import ButtonWithBackground from "./button";

class Input extends Component {
    state = {
        shouldShowActivityIndicator: false
    };

    handleCode = (text) => {
        this.setState({code: text})
    };

    handleNickname = (text) => {
        this.setState({nickname: text})
    };

    removeActivityIndicator = () => {
        this.setState({shouldShowActivityIndicator: false});
    };

    navigateToWait = () => {
        this.setState({shouldShowActivityIndicator: true});
        GameAPI.get_game_for_join_code(this.state.code, this.state.nickname)
            .then(game => {
                this.removeActivityIndicator();
                let gameNicknames = game.deviceIds;
                gameNicknames.push(this.state.nickname);
                this.props.navigation.navigate('Waiting', {isHost: false, lobbyCode: game.joinCode, nicknames: gameNicknames, playerNickname: this.state.nickname, navigation: this.props.navigation});
            })
            .catch(err => {
                alert("Failed to join game with code " + this.state.code);
                this.removeActivityIndicator();
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="#FFFFFF" animating={this.state.shouldShowActivityIndicator}/>
                <TextInput
                    style={styles.input1}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Join Code"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    color="white"
                    onChangeText={this.handleCode}
                />

                <TextInput
                    style={styles.input2}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Your Nickname"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    color="white"
                    onChangeText={this.handleNickname}
                />
                <View style={styles.button}>
                    <ButtonWithBackground onPress={() => {
                        this.navigateToWait();
                    }} text='Enter Lobby' color='#ff2e63'/>
                </View>
            </View>
        );
    }
}

export default Input

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input1: {
        margin: 30,
        height: 60,
        width: 350,
        borderColor: 'black',
        backgroundColor: '#ff2e63',
        borderWidth: 5,
        //borderRadius: 25,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '800'
    },
    input2: {
        margin: 0,
        height: 60,
        width: 350,
        borderColor: 'black',
        backgroundColor: '#ff2e63',
        borderWidth: 5,
        //borderRadius: 25,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '800'
    },
    submitButton: {
        backgroundColor: '#ff2e63',
        padding: 10,
        margin: 50,
        height: 50,
        width: 350,
        borderRadius: 25
    },
    submitButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '800'
    },
    button: {
        marginTop: '10%',
        alignItems: 'center',
        color: '#000000'
    },
})
