import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image} from "react-native";
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
            deviceIds: this.props.route.params.deviceIds,
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
            //console.log(this.props.route.params.votesByQuestion);
            //console.log(this.props.route.params.deviceIds);
            this.setState({assembledQuestionAndVotes: voteTotals});
        }
    }

    componentDidMount() {
        this.populateAssembled();
        if(!this.props.route.params.isHost) {
            this.interval = setInterval(() => {
                if(this.state.makingAPICall === false) {
                    this.setState({makingAPICall: true});
                    console.log("MAKING API CALL");
                    GameAPI.get_game_with_join_code(this.props.route.params.joinCode)
                        .then(game => {
                            console.log(game);
                            if(game.showScoreTime !== null && game.showScoreTime !== undefined) {
                                console.log(game.showScoreTime);
                                this.setState({makingAPICall: false});
                                clearInterval(this.interval);
                                this.props.navigation.navigate('RoundStandings', {showScoreTime: game.showScoreTime, currRoundNumber: 1, questions: this.props.route.params.questions,
                                    votesByQuestion: this.props.route.params.votesByQuestion,  deviceIds: this.props.route.params.deviceIds, assembledQuestionAndVotes: this.state.assembledQuestionAndVotes});
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
                            <Text style={styles.title}>ROUND 1</Text>
                    </View>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Waiting for Other Players</Text>
                        <ActivityIndicator/>
                    </View>
                    }

                    <ScrollView>
                        {
                            this.state.assembledQuestionAndVotes.map((item, index) => (
                                <View key = {index} style = {styles.item}>
                                    <Text style={{fontSize: 35, fontWeight: '800', color: 'white', textAlign: 'center'}}>QUESTION {item.questionNumber} {'\n'} {this.props.route.params.questions[item.questionNumber - 1].questionContent}</Text>
                                    {
                                        item.voteTotals.map((total, index2) => (
                                            <View key = {index2} style = {styles.item2}>
                                                <Text style={{fontSize: 25, fontWeight: '800', color: 'white', textAlign: 'left'}}>{total.voteTotal + " Voted For " + total.deviceId}</Text>
                                           </View>
                                        ))
                                    }
                                </View>
                                
                            ))
                        }
                        <View style={styles.button1}>
                            {
                                this.props.route.params.isHost ?
                                    <ButtonWithBackground onPress={() => {
                                        this.setState({loading: true});
                                        GameAPI.move_to_scores(this.props.route.params.joinCode)
                                            .then(game => {
                                                this.setState({loading: false});
                                                navigate('RoundStandings', {showScoreTime: game.showScoreTime, currRoundNumber: 1, questions: this.props.route.params.questions,
                                                    votesByQuestion: this.props.route.params.votesByQuestion,  deviceIds: this.props.route.params.deviceIds, assembledQuestionAndVotes: this.state.assembledQuestionAndVotes});
                                            })
                                            .catch(err => {
                                                alert('Error moving to scores screen');
                                                this.setState({loading: false});
                                            });
                                    }} text='View Standings' color = '#ff2e63'/> :
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

    button1: {
        //marginTop: '20%',
        marginBottom: '5%',
        alignItems: 'center',
        color: '#000000'
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

    item: {
        justifyContent: 'center',
        //alignItems: 'center',
        padding: 5,
        marginHorizontal: 5,
        marginTop: '5%',
        borderColor: '#000000',
       // borderWidth: 5,
        //backgroundColor: '#ff2e63',
        borderRadius: 30
    },

    item2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        marginTop: '5%',
        marginBottom: 5,
        borderColor: '#000000',
        borderWidth: 5,
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
export default RoundResults
