import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';


// Takes in parameters to produce a button object
const ButtonWithBackground = props => {
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
        borderRadius: 36,
        marginTop: '5%',
        padding: 18,
        width: 250,
        alignItems: 'center'
    },

    text:{
        color: 'white',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 25,
        textAlign: 'center',
    }
});

export default ButtonWithBackground;
