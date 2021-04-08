import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Animated, ActivityIndicator} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

class RoundScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            clearInterval(this.interval);
            this.setState({loading: false, isReady: true})
        }, new Date(this.props.route.params.gameStartTime).getTime() - new Date().getTime());
    }

    // Round Screen gives quick briefing before navigating to question screen
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.carContainer}>

                    <ImageBackground
                        source={require('./assets/background.png')}
                        style={styles.image}
                    />

                    <View style={styles.titles}>
                        <Text style={styles.title}>Guess Your Friends</Text>
                        <Text style={styles.subtitle}>Lets Get Judgy</Text>
                    </View>

                    <View style={styles.importantText}>
                        <Text style={styles.instruction}>Welcome to Round 1</Text>
                    </View>

                    <View style={styles.importantText}>
                        <Text style={styles.instruction2}>Choose The Player That Best Meets Each Prompt!</Text>
                    </View>

                    <View style={styles.clockContainer}>
                        <CountdownCircleTimer
                            isPlaying={this.state.isReady}
                            duration={15}
                            colors='#ff2e63'
                            trailColor='#ffffff'
                            strokeWidth='10'
                            strokeLinecap='round'
                            ariaLabel='hi'
                            onComplete={() => {
                                navigate('QuestionScreen', {questions: this.props.route.params.questions, players: this.props.route.params.players, joinCode: this.props.route.params.joinCode,
                                    deviceId: this.props.route.params.deviceId})}
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

    carContainer: {
        width: '100%',
        height: '100%',
    },

    titles: {
        width: '100%',
        alignItems: 'center',
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
        fontSize: 35,
        fontWeight: '800',
        color: 'black',
        marginTop: '5%',
        alignItems: 'center',
        textAlign: 'center'
      },

    instruction2: {
        fontSize: 25,
        fontWeight: '800',
        color: 'black',
        marginTop: 30,
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 20
      },

    clockContainer: {
        marginTop: '40%',
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
        color: 'black',
        marginTop: 5,
        textAlign: 'center'
    },
});

export default RoundScreen
