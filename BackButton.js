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
        borderRadius: 0,
        marginTop: '1%',
        padding: 5,
        width: 70,
      
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 5,
    },

    text:{
        color: 'white',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 15,
        textAlign: 'center',
    }
});


export default BackButtonWithBackground