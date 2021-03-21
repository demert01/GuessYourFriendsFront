import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import ButtonWithBackground from "./button";
import {StatusBar} from "expo-status-bar";

class RoundResults extends React.Component {
    
    // Navigates to Submit Order
    moveToSubmitOrder = (paymentType) => {
        this.props.navigation.navigate('SubmitOrder', { cart: this.props.route.params.cart, paymentType: paymentType })
    };


    // Checkout Screen which includes four payment options
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.carContainer}>

                    <ImageBackground
                        source={require('./assets/background.png')}
                        style={styles.image}
                    />

                    <View style={styles.titles}>
                        <Text style={styles.title}>Badger Bytes</Text>
                        <Text style={styles.subtitle}>Get Your Grub On</Text>
                    </View>

                    <View style={styles.importantText}>
                        <Text style={styles.instruction}>Select Your Payment Method</Text>
                    </View>

                    <View style={styles.buttons}>
                        <ButtonWithBackground onPress={() => this.moveToSubmitOrder("Credit Card")} text='Credit Card' color='#d12a3b' />
                    </View>

                    <View style={styles.buttons}>
                        <ButtonWithBackground onPress={() => this.moveToSubmitOrder("PayPal")} text='Paypal' color='#d12a3b' />
                    </View>

                    <View style={styles.buttons}>
                        <ButtonWithBackground onPress={() => this.moveToSubmitOrder("Stripe")} text='Stripe' color='#d12a3b' />
                    </View>

                    <View style={styles.buttons}>
                        <ButtonWithBackground onPress={() => this.moveToSubmitOrder("ApplePay")} text='ApplePay' color='#d12a3b' />
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
        backgroundColor: '#d12a3b'
    },

    title: {
        fontSize: 35,
        fontWeight: '700',
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
        alignItems: 'center'
      },
    
    instruction: {
        fontSize: 25,
        fontWeight: '700',
        color: 'white',
        marginTop: 27
      }


});

export default RoundResults
