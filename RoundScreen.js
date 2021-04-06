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
                        <Text style={styles.instruction2}>Select the Player that best meets each prompt!</Text>
                    </View>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Waiting for Other Players</Text>
                        <ActivityIndicator/>
                    </View>
                    }

                    <View style={styles.clockContainer}>
                        <CountdownCircleTimer
                            isPlaying={this.state.isReady}
                            duration={15}
                            colors="#004777"
                            onComplete={() => {
                                navigate('QuestionScreen')}             
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

    buttons: {
        marginTop: '10%',
        alignItems: 'center',
    },

    button2: {
        marginTop: '5%',
        alignItems: 'center',

    },

    titles: {
        width: '100%',
        alignItems: 'center',

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
        fontSize: 35,
        fontWeight: '800',
        color: 'white',
        marginTop: 27,
        alignItems: 'center'
      },

    instruction2: {
        fontSize: 25,
        fontWeight: '700',
        color: 'white',
        marginTop: 30,
        alignItems: 'center'
      },

    clockContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       // paddingTop: '5%',
        //backgroundColor: '#ecf0f1',
        padding: 8,
    },

    remainingTime: {
        fontSize: 46,
    },
    loadingText:  {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginTop: 5,
        textAlign: 'center'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RoundScreen
