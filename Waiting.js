import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Image, TouchableHightlight} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";

// Waiting Screen which waits for Host to start Lobby
class Waiting extends React.Component {
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
                        <Text style={styles.title}>Guess Your </Text>
                        <Text style={styles.title}>Friends</Text>
                        <Text style={styles.subtitle}>Lets Get Judgy</Text>
                    </View>


                    <View style={styles.importantText}>
                        <Text style={styles.instruction}>Waiting for the Host to Start the Lobby</Text>
                    </View>
                   

                </View>
                <StatusBar style="auto" />
            </View>
        );
    function blink(){

    }
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
        marginTop: '22%',
        width: '100%',
        alignItems: 'center',
       // backgroundColor: '#d12a3b'
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white'
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

    crest: {
        width: '100%',
        height: '20%',
        resizeMode: 'contain',
        marginTop: '10%'
        //position: 'absolute',

    },

    importantText: {
        marginTop: '5%',
        width: '100%',
        alignItems: 'center'
      },
    
      instruction: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        marginTop: 35,
        textAlign: 'center'
      }

});

export default Waiting
