import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator} from "react-native";
import {StatusBar} from "expo-status-bar";
import ButtonWithBackground from "./button";
import Game from "./API/Game/Game";
const GameAPI = require('./API/Game/GameAPI');

// Waiting Screen which waits for Host to start Lobby
class Waiting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            nicknames: this.props.route.params.nicknames,
            makingAPICall: false,
            loading: false
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        GameAPI.get_game_with_join_code(this.props.route.params.lobbyCode)
            .then(game => {
                this.setState({
                    nicknames: game.deviceIds,
                    refreshing: false
                });
            })
            .catch(err => {
               alert('Error refreshing game members');
               this.setState({refreshing: false});
            });
    };

    componentDidMount() {
        if(!this.props.route.params.isHost) {
            this.interval = setInterval(() => {
                if(this.state.makingAPICall === false) {
                    this.setState({makingAPICall: true});
                    GameAPI.get_game_with_join_code(this.props.route.params.lobbyCode)
                        .then(game => {
                            if(game.started) {
                                GameAPI.set_ready(this.props.route.params.lobbyCode, this.props.route.params.playerNickname)
                                    .then(() => {
                                        clearInterval(this.interval);
                                        this.setState({makingAPICall: false});
                                        this.checkAllPlayersReady();
                                    })
                                    .catch(err => {
                                        this.setState({makingAPICall: false});
                                    })
                            } else {
                                this.setState({makingAPICall: false});
                            }
                        })
                        .catch(err => {
                            this.setState({makingAPICall: false});
                        });
                }
            }, 5000);
        }
    }

    checkArrays = ( arrA, arrB ) => {

        //check if lengths are different
        if(arrA.length !== arrB.length) return false;


        //slice so we do not effect the original
        //sort makes sure they are in order
        //join makes it a string so we can do a string compare
        let cA = arrA.slice().sort().join(",");
        let cB = arrB.slice().sort().join(",");

        return cA===cB;

    };


    checkAllPlayersReady() {
        this.setState({loading: true});
        this.interval2 = setInterval(() => {
            if(this.state.makingAPICall === false) {
                this.setState({makingAPICall: true});
                GameAPI.get_game_with_join_code(this.props.route.params.lobbyCode)
                    .then(game => {
                        if(game.started && this.checkArrays(game.readyPlayers, game.deviceIds) && game.gameStartTime) {
                            this.setState({loading: false});
                            clearInterval(this.interval2);
                            this.props.route.params.navigation.navigate('RoundScreen', {gameStartTime: game.gameStartTime});
                        } else {
                            this.setState({makingAPICall: false});
                        }
                    })
                    .catch(err => {
                        this.setState({makingAPICall: false});
                    });
            }
        }, 3000);
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.carContainer}>
                    <ImageBackground
                        source={require('./assets/background.png')}
                        style={styles.image}
                    />

                    <View>
                        {
                            this.props.route.params.isHost ?
                            <View style={styles.importantText}>
                                <Text style={styles.instruction}>Start the game when ready</Text>
                                <Text style={styles.instruction}>Join Code: {this.props.route.params.lobbyCode || ""}</Text>
                            </View> :
                            <View style={styles.importantText}>
                                <Text style={styles.instruction}>Waiting for host to start the game</Text>
                                <Text style={styles.instruction}>Join Code: {this.props.route.params.lobbyCode || ""}</Text>
                            </View>
                        }
                    </View>

                    {this.state.loading &&
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Waiting for Other Players</Text>
                        <ActivityIndicator/>
                    </View>
                    }

                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        {
                            this.state.nicknames.map((item, index) => (
                                <View key = {index} style = {styles.item}>
                                    <Text style={{fontSize: 20, fontWeight: '600'}}>{item}</Text>
                                </View>
                            ))
                        }
                        {
                            this.props.route.params.isHost ?
                                <View style={styles.button1}>
                                    <ButtonWithBackground onPress={() => {
                                        this.setState({loading: true});
                                        GameAPI.start_game(this.props.route.params.lobbyCode, this.props.route.params.hostDeviceId)
                                            .then(game => {
                                                this.checkAllPlayersReady();
                                            })
                                            .catch(err => {
                                                this.setState({loading: false});
                                                alert("Unable to start game");
                                            });
                                    }} text='Start Game' color='#d12a3b' />
                                </View>
                                :
                                null
                        }
                    </ScrollView>
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
      },
    loadingText:  {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginTop: 5,
        textAlign: 'center'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
    button1: {
        marginTop: '20%',
        alignItems: 'center',
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

export default Waiting
