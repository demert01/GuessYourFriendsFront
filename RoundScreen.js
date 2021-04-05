import React from 'react';
<<<<<<< HEAD
import {ImageBackground, StyleSheet, Text, View, Animated} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

class RoundScreen extends React.Component {
    
    // Round Screen gives quick briefing before navigating to question screen
=======
import {StyleSheet, View} from "react-native";

class RoundScreen extends React.Component {

    // Checkout Screen which includes four payment options
>>>>>>> 7a3298e35b3fc888fe22ae232dcf7788c89413cd
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
<<<<<<< HEAD
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

                    <View style={styles.clockContainer}>
                        <CountdownCircleTimer
                            isPlaying
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
=======
>>>>>>> 7a3298e35b3fc888fe22ae232dcf7788c89413cd
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
<<<<<<< HEAD
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
=======
    }
>>>>>>> 7a3298e35b3fc888fe22ae232dcf7788c89413cd
});

export default RoundScreen
