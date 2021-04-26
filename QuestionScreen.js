import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, ActivityIndicator, Image} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
const GameAPI = require('./API/Game/GameAPI');
const GLOBAL = require('./globals');

class QuestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currQuestionNumber: (this.props.route.params.currRoundNumber - 1) * 5,
            players: this.props.route.params.players,
            disableButtons: false,
            loading: false,
            makingAPICall: false,
            waitingForNext: false,
        }
    }

    voteForPlayer = (name) => {
        this.setState({loading: true, disableButtons: true});
        GameAPI.vote(this.props.route.params.joinCode, this.state.currQuestionNumber, name, this.props.route.params.deviceId)
            .then(game => {
                this.setState({disableButtons: true, loading: false});
                this.checkReadyForNextQuestion();
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false, disableButtons: false});
                alert("There was an error while voting");
            });
    };

    checkReadyForNextQuestion() {
        this.setState({waitingForNext: true});
        this.interval2 = setInterval(() => {
            if(this.state.makingAPICall === false) {
                this.setState({makingAPICall: true});
                console.log("MAKING API CALL");
                GameAPI.check_ready_next_question(this.props.route.params.joinCode, this.state.currQuestionNumber)
                    .then(game => {
                        if(game.nextQuestionStartTime) {
                            clearInterval(this.interval2);

                            // Show next question
                            this.interval = setInterval(() => {
                                clearInterval(this.interval);
                                let currQuestion = this.state.currQuestionNumber + 1;
                                if (currQuestion % 5 === 0 && currQuestion !== 0) {
                                    const { push } = this.props.navigation;
                                    GLOBAL.votesByQuestion = game.votesByQuestion;
                                    push('RoundResults', {joinCode: this.props.route.params.joinCode,
                                        currRoundNumber: this.props.route.params.currRoundNumber,
                                        questions: this.props.route.params.questions,
                                        votesByQuestion: game.votesByQuestion, deviceIds: game.deviceIds,
                                        isHost: this.props.route.params.isHost, players: this.props.route.params.players, deviceId: this.props.route.params.deviceId})
                                } else {
                                    currQuestion = currQuestion;
                                    this.setState({waitingForNext: false, currQuestionNumber: currQuestion, disableButtons: false, makingAPICall: false})
                                }
                            }, new Date(game.nextQuestionStartTime).getTime() - new Date().getTime() > 0 ? new Date(game.nextQuestionStartTime).getTime() - new Date().getTime() : 100);
                        } else {
                            this.setState({makingAPICall: false});
                        }
                    })
                    .catch(err => {
                        this.setState({makingAPICall: false});
                    });
            }
        }, 3000);
    }

    // Round Screen gives quick briefing before navigating to question screen
    render() {
        //const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground
                        source={require('./assets/background.png')}
                        style={styles.image}
                />

                <View style={styles.questionContainer}>



                    <View style={styles.titles}>
                        <Text style={styles.title}>QUESTION {this.state.currQuestionNumber + 1}</Text>
                    </View>

                    <View style={styles.importantText}>
                        <Text style={styles.instruction}>{this.props.route.params.questions[this.state.currQuestionNumber].questionContent}</Text>
                    </View>

                    <View style={styles.buttons}>

                        <ScrollView>
                            {
                                this.state.players.map((item, index) => (
                                    <ButtonWithBackground disabled={this.state.disableButtons} text={item} key={index} onPress={() => {
                                        this.voteForPlayer(item);
                                    }} color='#ff2e63' />
                                ))
                            }
                        </ScrollView>

                    </View>

                    <ActivityIndicator size='large' color="white" animating={this.state.loading}/>
                    {this.state.waitingForNext &&
                    <View style={styles.loading}>                                          
                        <ActivityIndicator size='large' color="#FFFFFF" animating={this.state.shouldShowActivityIndicator}/>
                    </View>
                    }

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

    questionContainer: {
        height: '100%',
        width: '100%',
        paddingTop: 100,
    },

    buttons: {
        marginTop: '10%',
        alignItems: 'center',
        height: '100%'
    },

    titles: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10

    },

    title: {
        fontSize: 35,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center'
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
        alignItems: 'center',
        justifyContent: 'center'
      },
    
    instruction: {
        fontSize: 30,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center'
      },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
       // opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingText:  {
        fontSize: 25,
        fontWeight: '800',
        color: 'white',
        marginTop: 5,
        textAlign: 'center'
    },

});
export default QuestionScreen
