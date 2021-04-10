import React, {Component} from 'react'
import {ActivityIndicator, View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage} from 'react-native'
import GameAPI from "./API/Game/GameAPI"
import QuestionSetAPI from "./API/QuestionSet/QuestionSetAPI";
import ButtonWithBackground from "./button";
import QuestionSelections from "./QuestionSelections";

//const client = require('./Utilities/client');

// Handles text field data from login page and communicates to backend
class HostScreenInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            shouldShowActivityIndicator: false,
            questionSets: [],
            selectedQuestionSet: null,
        };
    }

    handleUsername = (text) => {
        this.setState({username: text})
    };

    removeActivityIndicator = () => {
        this.setState({shouldShowActivityIndicator: false});
    };

    createGame = () => {
        this.setState({shouldShowActivityIndicator: true});
        GameAPI.create_game(this.state.username, this.state.selectedQuestionSet)
            .then(game => {
                this.removeActivityIndicator();
                this.props.navigation.navigate('Waiting', {isHost: true, lobbyCode: game.joinCode,
                    nicknames: game.deviceIds, hostDeviceId: this.state.username, navigation: this.props.navigation});
            })
            .catch(err => {
                this.removeActivityIndicator();
                alert(err.message);
            });
    };

    getQuestionSets = () => {
        this.setState({shouldShowActivityIndicator: true});
        QuestionSetAPI.get_question_sets()
            .then(sets => {
                this.setState({questionSets: sets, shouldShowActivityIndicator: false});
            })
            .catch(err => {
                alert("There was a problem getting the question sets");
                this.setState({shouldShowActivityIndicator: false});
            });
    };

    componentDidMount() {
        this.getQuestionSets();
    }

    selectQuestionSet = (id) => {
        console.log(id);
        this.setState({selectedQuestionSet: id});
    };


    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="#FFFFFF" animating={this.state.shouldShowActivityIndicator}/>
                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholder="Enter Your Nickname"
                           placeholderTextColor="white"
                           autoCapitalize="none"
                           color="white"
                           onChangeText={this.handleUsername}/>
                <QuestionSelections 
                 navigation ={this.props.navigation}
                 questionSets={this.state.questionSets} selectQuestionSet={this.selectQuestionSet}/>
                <View style={styles.button}>
                    <ButtonWithBackground onPress={() => {
                        this.createGame();
                    }} text='Enter Lobby' color='#ff2e63'/>
                </View>
            </View>
        )
    }
}

export default HostScreenInput

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
       
    },
    input: {
        height: 60,
        width: 350,
        margin: 30,
        borderColor: 'black',
        backgroundColor: '#ff2e63',
        borderWidth: 5,
        //borderRadius: 25,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '800'
        
    },
    
    button: {
        marginTop: '40%',
        alignItems: 'center',
        color: '#000000'
    },

})
