import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";

class QuestionScreen extends React.Component {
    // Round Screen gives quick briefing before navigating to question screen
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
                        <Text style={styles.title}>Question 1</Text>
                    </View>

                    <View style={styles.importantText}>
                        <Text style={styles.instruction}>Sample Question: Who is all bark no bite?</Text>
                    </View>

                    <View style={styles.buttons}>

                        <ScrollView>
                            <ButtonWithBackground text='Player 1' color='#ff2e63' />

                            <ButtonWithBackground text='Player 2' color='#ff2e63' />

                            <ButtonWithBackground text='Player 3' color='#ff2e63' />

                            <ButtonWithBackground text='Player 4' color='#ff2e63' />

                        </ScrollView>

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
        fontSize: 30,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center'
      },

});
export default QuestionScreen
