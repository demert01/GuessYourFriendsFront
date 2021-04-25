import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
const GameAPI = require('./API/Game/GameAPI');

class RoundStandings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currRoundNumber: this.props.route.params.currRoundNumber,
            disableButtons: false,
            loading: false,
            makingAPICall: false,
            waitingForNext: false,
            scores: [],
            highestScore: 0,
            assembledQuestionAndVotes: [],
            currQuestionNumber: this.props.route.params.currQuestionNumber,
            votesByQuestion: this.props.route.params.votesByQuestion,
            deviceIds: this.props.route.params.deviceIds,
        }
    }

    shouldIncrement = (questionNumber, votedFor) => {
        for(let i = 0; i<this.props.route.params.assembledQuestionAndVotes.length; i++) {
            if(parseInt(this.props.route.params.assembledQuestionAndVotes[i].questionNumber) === questionNumber) {
                let current_max = 0;
                for(let x = 0; x<this.props.route.params.assembledQuestionAndVotes[i].voteTotals.length; x++) {
                    if(this.props.route.params.assembledQuestionAndVotes[i].voteTotals[x].voteTotal > current_max) {
                        current_max = this.props.route.params.assembledQuestionAndVotes[i].voteTotals[x].voteTotal;
                    }
                }
                for(let x = 0; x<this.props.route.params.assembledQuestionAndVotes[i].voteTotals.length; x++) {
                    if(this.props.route.params.assembledQuestionAndVotes[i].voteTotals[x].voteTotal >= current_max) {
                        if(votedFor === this.props.route.params.assembledQuestionAndVotes[i].voteTotals[x].deviceId) {
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
        for(let i = 0; i < 5; i++){      
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
        this.setState({scores: scoreTotals});     
    }

    componentDidMount() {
        this.calculateScores();
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
                            <Text style={styles.title}>Scores</Text>
                    </View>

                    <ScrollView>
                        {
                            this.state.scores.map((players, index) => (
                                <View key = {index} style = {styles.item}>
                                    <Text style={styles.item2}>{players.player + ": "}</Text>
                                    <Text style={styles.title}>{players.score}</Text>
                                </View>
                            ))
                        }
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

});
export default RoundStandings
