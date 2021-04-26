import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
import { StackActions } from '@react-navigation/native';
const GameAPI = require('./API/Game/GameAPI');
const GLOBAL = require('./globals');

class RoundStandings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currRoundNumber: GLOBAL.currRoundNumber,
            disableButtons: false,
            loading: false,
            makingAPICall: false,
            waitingForNext: false,
            scores: [],
            highestScore: 0,
            assembledQuestionAndVotes: [],
            votesByQuestion: GLOBAL.votesByQuestion,
            deviceIds: GLOBAL.players,
        }
    }

    shouldIncrement = (questionNumber, votedFor) => {
        for(let i = 0; i<GLOBAL.assembledQuestionAndVotes.length; i++) {
            if(parseInt(GLOBAL.assembledQuestionAndVotes[i].questionNumber) === questionNumber) {
                let current_max = 0;
                for(let x = 0; x<GLOBAL.assembledQuestionAndVotes[i].voteTotals.length; x++) {
                    if(GLOBAL.assembledQuestionAndVotes[i].voteTotals[x].voteTotal > current_max) {
                        current_max = GLOBAL.assembledQuestionAndVotes[i].voteTotals[x].voteTotal;
                    }
                }
                for(let x = 0; x<GLOBAL.assembledQuestionAndVotes[i].voteTotals.length; x++) {
                    if(GLOBAL.assembledQuestionAndVotes[i].voteTotals[x].voteTotal >= current_max) {
                        if(votedFor === GLOBAL.assembledQuestionAndVotes[i].voteTotals[x].deviceId) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;

    };

    // This function retrieves the players score for a given ID
    getPlayerScore = (deviceId) => {
        let points = 0;
        // Iterate through each question
        for(let i = 0; i<5*this.state.currRoundNumber; i++){
            let votedFor = "";
            for(let x = 0; x < this.state.votesByQuestion.length; x++) {
                if(this.state.votesByQuestion[x].questionNumber === i && this.state.votesByQuestion[x].voter === deviceId) {
                    votedFor = this.state.votesByQuestion[x].votedFor
                }
            }
            if(this.shouldIncrement(i + 1, votedFor)) {
                points += 1;
            }
        }
        return points;
    };

    // This function calculates the total score of each player in the game
    calculateScores() {
        // Iterate through each player in the game
        let scoreTotals = [];
        for(let i = 0; i < this.state.deviceIds.length; i++){
            // Obtain score for a player
            let playerScore = this.getPlayerScore(this.state.deviceIds[i]);

            // Object that represents a player in a round
            let playerObject = {
                player: this.state.deviceIds[i],
                score: playerScore
            };
            scoreTotals.push(playerObject);        
        }
        console.log(scoreTotals);
        this.setState({scores: scoreTotals});     
    }

    componentDidMount() {
        this.calculateScores();
        if(!GLOBAL.isHost) {
            this.interval = setInterval(() => {
                if(this.state.makingAPICall === false) {
                    this.setState({makingAPICall: true});
                    console.log("MAKING API CALL");
                    GameAPI.get_game_with_join_code(GLOBAL.joinCode)
                        .then(game => {
                            console.log(game);
                            if(game.gameStartTime) {
                                this.setState({makingAPICall: false});
                                clearInterval(this.interval);
                                this.props.navigation.push('RoundScreen', {currRoundNumber: this.state.currRoundNumber + 1,
                                    gameStartTime: game.gameStartTime, questions: GLOBAL.questions,
                                    players: GLOBAL.players, deviceId: GLOBAL.deviceId, isHost: GLOBAL.isHost, joinCode: GLOBAL.joinCode})
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
    }

    // Round Results will display the results for each qeustion
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground
                        source={require('./assets/background.png')}
                        style={styles.image}
                />
                <View style={styles.questionContainer}>   
                    <View style={styles.titles}>
                            <Text style={styles.title}>Scores through round {GLOBAL.currRoundNumber}</Text>
                    </View>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Waiting for Other Players</Text>
                        <ActivityIndicator/>
                    </View>
                    }

                    <ScrollView>
                        {
                            this.state.scores.map((players, index) => (
                                <View key = {index} style = {styles.item}>
                                    <Text style={styles.item2}>{players.player + ": "}</Text>
                                    <Text style={styles.title}>{players.score}</Text>
                                </View>
                            ))
                        }
                        <View style={styles.button1}>
                            {
                                GLOBAL.isHost ?
                                    <ButtonWithBackground onPress={() => {
                                        this.setState({loading: true});
                                        GameAPI.move_to_next_round(GLOBAL.joinCode)
                                            .then(game => {
                                                this.setState({loading: false});
                                                this.props.navigation.push('RoundScreen', {currRoundNumber: this.state.currRoundNumber + 1,
                                                    gameStartTime: game.gameStartTime,
                                                    questions: GLOBAL.questions, players: GLOBAL.players, deviceId: GLOBAL.deviceId, isHost: GLOBAL.isHost, joinCode: GLOBAL.joinCode})
                                            })
                                            .catch(err => {
                                                this.setState({loading: false});
                                            });
                                    }} text='Next Round' color = '#ff2e63'/> :
                                    null
                            }
                        </View>
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

    questionContainer: {
        height: '100%',
        width: '100%',
        padding: 10,
    },

    titles: {
        width: '100%',
        alignItems: 'center',
        marginTop: '15%',
    },

    title: {
        fontSize: 35,
        fontWeight: '900',
        color: 'white',
        textAlign: 'center',
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

    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        marginHorizontal: 30,
        marginTop: 15,
        marginBottom: 5,
        borderColor: '#000000',
        borderWidth: 5,
        backgroundColor: '#ff2e63',
        borderRadius: 30
    },

    item2: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 35,
        fontWeight: '900',
        color: 'white',
        textAlign: 'left',
        width: 200,
        borderColor: '#000000',
        //borderWidth: 5,
        backgroundColor: '#ff2e63',
        borderRadius: 30
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

    button1: {
        //marginTop: '20%',
        marginBottom: '5%',
        alignItems: 'center',
        color: '#000000'
    },

});
export default RoundStandings
