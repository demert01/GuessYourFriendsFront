import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
const GameAPI = require('./API/Game/GameAPI');

class RoundResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currRoundNumber: this.props.route.params.currRoundNumber,
            //players: this.props.route.params.players,
            disableButtons: false,
            loading: false,
            makingAPICall: false,
            waitingForNext: false,
            assembledQuestionAndVotes: [],
            currQuestionNumber: this.props.route.params.currQuestionNumber,
            votesByQuestion: this.props.route.params.votesByQuestion,
            deviceIds: this.props.route.params.deviceIds
        }
    }

    getVotes = (deviceId, questionNumber) => {
        let voteCount = 0;
        for(let i = 0; i<this.state.votesByQuestion.length; i++) {
            if(questionNumber === this.state.votesByQuestion[i].questionNumber && deviceId === this.state.votesByQuestion[i].votedFor) {
                voteCount += 1;
            }
        }
        return voteCount;
    };

    populateAssembled(){
        if(this.state.assembledQuestionAndVotes !== []) {
            let voteTotals = [];
            for(let i = 0; i < 5; i++) {
                let voteInfo = [];
                const questionNumber = ((i + 1) * this.state.currRoundNumber);
                for(let x = 0; x < this.state.deviceIds.length; x++) {
                    const totalForPerson = this.getVotes(this.state.deviceIds[x], questionNumber - 1);
                    voteInfo.push({deviceId: this.state.deviceIds[x], voteTotal: totalForPerson});
                }
                let assembledObject = {
                    questionNumber: "" + questionNumber,
                    voteTotals: voteInfo
                };
                voteTotals.push(assembledObject);
            }
            console.log(voteTotals);
            this.setState({assembledQuestionAndVotes: voteTotals});
        }
    }

    componentDidMount() {
        this.populateAssembled();
    }

    // Round Results will display the results for each qeustion
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
                            <Text style={styles.title}>Round 1</Text>
                        </View>


                    <ScrollView>
                        {
                            this.state.assembledQuestionAndVotes.map((item, index) => (
                                <View key = {index} style = {styles.item}>
                                    <Text style={{fontSize: 25, fontWeight: '800', color: 'white'}}>{this.props.route.params.questions[item.questionNumber - 1].questionContent}</Text>
                                    {
                                        item.voteTotals.map((total) => (
                                           <Text style={{fontSize: 25, fontWeight: '800', color: 'white'}}>{total.deviceId + ": " + total.voteTotal}</Text>
                                        ))
                                    }
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

    titles2: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },

    title: {
        fontSize: 35,
        fontWeight: '900',
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
        marginTop: '20%',
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

    question: {
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
        color: 'black',
        marginTop: 5,
        textAlign: 'center'
    },

});
export default RoundResults
