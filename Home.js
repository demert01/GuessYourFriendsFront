import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Image, TouchableHightlight} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";

// Home Screen which includes Host and Join Buttons
class Home extends React.Component {
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
                        <Image style={styles.logo}
                        source={require('./assets/NewLogo2.png')}
                        />
                    </View>

                    


                    <View style={styles.button1}>
                        <ButtonWithBackground onPress={() => {navigate('HostScreen')}} text='Host Game' color = '#ff2e63'/>
                        
                    </View>

                    <View style={styles.button2}>
                        <ButtonWithBackground onPress={() => {navigate('Join')}} text='Join Game' color='#ff2e63' />
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

    button1: {
        marginTop: '20%',
        alignItems: 'center',
        color: '#000000'
    },

    button2: {
        marginTop: '5%',
        alignItems: 'center',

    },

    button3: {
        fontSize: 40
    },

    titles: {
        marginTop: '22%',
        width: '100%',
        alignItems: 'center',
    },

    title: {
        fontSize: 50,
        fontWeight: '900',
        color: 'white'
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

    logoContainer: {
        marginTop: '20%',
        marginLeft: 5,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },

    logo: {
       // width: '100%',
      //  height: '100%',
      //  resizeMode: 'cover',
      //  position: 'absolute',
    },

    crest: {
        width: '100%',
        height: '20%',
        resizeMode: 'contain',
        marginTop: '10%'
    }

});

export default Home
