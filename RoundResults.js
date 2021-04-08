import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
const GameAPI = require('./API/Game/GameAPI');

class QuestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currQuestionNumber: 0,
            currRoundNumber: 1,
            //players: this.props.route.params.players,
            disableButtons: false,
            loading: false,
            makingAPICall: false,
            waitingForNext: false
        }
    }

    checkRoundNumber(){
        if(this.state.currQuestionNumber % 5 == 0 && this.state.currQuestionNumber != 0){
            this.state.currRoundNumber = this.state.currRoundNumber + 1;
        }
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
                        {/* Must increment round every every time questionNumber % 5 == 0 */}
                            {this.checkRoundNumber()}
                            <Text style={styles.title}>Round {this.state.currRoundNumber}</Text>
                        </View>

                    
                    <View style={styles.titles2}>
                        <Text style={styles.instruction}>Results from Question {this.state.currQuestionNumber + 1}</Text>
                    </View>

                    <View style={styles.importantText}>
                        <Text style={styles.question}>Display Question Here</Text>
                    </View>

                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        {/*{ This will display the players in the game along with their respective vote counts for a question
                            this.state.nicknames.map((item, index) => (
                                <View key = {index} style = {styles.item}>
                                    <Text style={{fontSize: 25, fontWeight: '800', color: 'white'}}>{item}</Text>
                                </View>
                            ))
                        }
                    */}
                     </ScrollView>

                        {this.state.loading &&
                        <View style={styles.loading}>
                            <Text style={styles.loadingText}>Waiting for Other Players</Text>
                            <ActivityIndicator/>
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
export default QuestionScreen
