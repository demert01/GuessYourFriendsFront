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

    // This function finds the top vote getter for a given question
    findTopVoteGetter = (questionNumber) => {     
        let allVotes = [];

        // Iterate through each player in the game
        for(let i = 0; i < this.state.deviceIds.length; i++){

            // Finds the current vote data within votesByQuestion
            let currVotedFor =  this.state.votesByQuestion[questionNumber + i].votedFor
            let votePerQuestion = {};

            // Base case, no votes stored. Add data to object and push to array
            if(allVotes.length === 0){      
                votePerQuestion = {playerVoted: currVotedFor, points: 1, questionNum: questionNumber};
                allVotes.push(votePerQuestion);
            }
            
            else{ // allVotes has some data
               
                // Check if the name is not already stored
                if(!allVotes.includes(votesPerQuestion, 0)){
                    votePerQuestion = {playerVoted: currVotedFor, points: 1, questionNum: questionNumber};
                    allVotes.push(votePerQuestion);
                }

                // Otherwise increment the point value
                else{
                  
                    let index = allVotes.findIndex(votePerQuestion => votePerQuestion.playerVoted === currVotedFor);
                    allVotes[index].points = allVotes[index].points + 1;
                }
            }
        }
        
        // Iterate through all votes and find the Highest Point Total
        let maxVoteGetter = "";
        let maxValue = 0;
        for(let j = 0; j < allVotes.length; j++){   
            if(allVotes[j].points > maxValue){
                maxValue = allVotes[j].points
            }
        }

        this.state.highestScore = maxValue;
        // return the highest voted player
        for(let x = 0; x < allVotes.length; x++){   
            if(allVotes[x].points === maxValue){
                return allVotes[x].playerVoted;
            }
        } 
    }

    // This function retrieves the players score for a given ID
    getPlayerScore = (deviceId) => {
        let points = 0;
        // Iterate through each question
        for(let i = 0; i < 5; i++){      
            // If the current player is the voter
            if(deviceId === this.state.votesByQuestion[i].voter){
                // If that player voted for the player with the most votes, they earn a point
                // NOTE* THIS DOES NOT ACCOUNT FOR TIES, ONLY THE FIRST PLAYER IN AN ARRAY WITH MAX POINTS FOR A QUESTION
                if(this.state.votesByQuestion[i].votedFor === this.findTopVoteGetter(i)){      
                    points += 1;
                }    
            }
        }
        return points;
    };

    // This function calculates the total score of each player in the game
    calculateScores() {
        // Iterate through each player in the game
        let scoreTotals = []
        console.log("TEST");
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
        console.log(this.state.scores);
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
                            this.state.deviceIds.map((item, index) => (
                                this.state.scores.map((players) => (
                                    <View key = {index} style = {styles.item}> 
                                        <Text style={styles.item2}>{players.player + ": "}</Text>
                                        <Text style={styles.title}>{players.score}</Text>
                                    </View>

                                ))
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
