import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';


// Takes in parameters to produce a button object
const BackButtonWithBackground = props => {
    const content = (
        <View style = {[styles.button, {backgroundColor: props.color}]}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );

    // Click effect
    return <TouchableOpacity disabled={props.disabled || false} onPress={props.onPress}>{content}</TouchableOpacity>
}



// Formatting
const styles = StyleSheet.create({
   
    button: {
        height: 80,
        width: 350,
        borderColor: 'black',
        backgroundColor: '#ff2e63',
        borderWidth: 5,
       // borderRadius: 25,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: '800'
    },

    text:{
        color: 'white',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 16
    }
});


export default BackButtonWithBackground