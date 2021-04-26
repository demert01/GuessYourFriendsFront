import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Animated, ActivityIndicator, ScrollView, Image} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import {GL} from "expo/build/removed.web";
const GLOBAL = require('./globals');

class RoundScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            loading: true,
            currRoundNumber: this.props.route.params.currRoundNumber || 1
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            clearInterval(this.interval);
            this.setState({loading: false, isReady: true})
        }, new Date(this.props.route.params.gameStartTime).getTime() - new Date().getTime() > 0 ? new Date(this.props.route.params.gameStartTime).getTime() - new Date().getTime() : 100);
    }

    // Round Screen gives quick briefing before navigating to question screen
    render() {
        const { push } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.carContainer}>

                    <ImageBackground
                        source={require('./assets/background.png')}
                        style={styles.image}
                    />

                    <View style={styles.titles}>
                        <Image style={styles.logo}
                        source={require('./assets/NewLogo2.png')}
                        />
                    </View>

                    <ScrollView>
                        <View style={styles.importantText}>
                            <Text style={styles.instruction}>ROUND {this.state.currRoundNumber}</Text>
                        </View>

                        <View style={styles.importantText}>
                            <Text style={styles.instruction2}>Earn Points By Guessing With The Crowd!</Text>
                        </View>

                        <View style={styles.clockContainer}>
                            <CountdownCircleTimer
                                isPlaying={this.state.isReady}
                                duration={10}
                                key={this.state.currRoundNumber}
                                colors='#ff2e63'
                                trailColor='#ffffff'
                                strokeWidth='10'
                                strokeLinecap='round'
                                ariaLabel='hi'
                                onComplete={() => {
                                    GLOBAL.currRoundNumber = this.state.currRoundNumber;
                                    push('QuestionScreen', {questions: this.props.route.params.questions, players: this.props.route.params.players, joinCode: this.props.route.params.joinCode,
                                        deviceId: this.props.route.params.deviceId, isHost: this.props.route.params.isHost, currRoundNumber: this.state.currRoundNumber})}
                                }
                            >
                                {({ remainingTime, animatedColor }) => (
                                    <Animated.Text
                                        style={{ ...styles.remainingTime, color: animatedColor }}>
                                        {remainingTime}
                                    </Animated.Text>
                                )}
                            </CountdownCircleTimer>
                        </View>
                    </ScrollView>

                    {this.state.loading &&
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

    carContainer: {
        width: '100%',
        height: '100%',
    },

    titles: {
        width: '100%',
        alignItems: 'center',
        marginTop: '20%'
    },
    
    title: {
        fontSize: 50,
        fontWeight: '900',
        color: '#ffffff',
        textAlign: 'center'
      },
    
    subtitle: {
        fontSize: 25,
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
        fontSize: 50,
        fontWeight: '900',
        color: 'white',
        marginTop: '5%',
        alignItems: 'center',
        textAlign: 'center'
      },

    instruction2: {
        fontSize: 30,
        fontWeight: '900',
        color: 'white',
        marginTop: 30,
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 20
      },

    clockContainer: {
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },

    remainingTime: {
        fontSize: 46,
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

export default RoundScreen
