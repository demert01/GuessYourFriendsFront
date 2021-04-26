import React from 'react';
import {ImageBackground, StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator, Image} from "react-native";
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
                            this.props.route.params.navigation.navigate('RoundScreen', {gameStartTime: game.gameStartTime, questions: game.questions, players: game.deviceIds,
                            joinCode: game.joinCode, deviceId: this.props.route.params.isHost ? this.props.route.params.hostDeviceId : this.props.route.params.playerNickname, isHost: this.props.route.params.isHost});
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

                <View style={styles.titles}>
                    <Image style={styles.logo}
                    source={require('./assets/NewLogo2.png')}
                    />
                </View>

                    <View>
                        {
                            this.props.route.params.isHost ?
                            <View style={styles.importantText}>
                                <Text style={styles.instruction}>Start Game When Ready</Text>
                                <Text style={styles.instruction}>Join Code: {this.props.route.params.lobbyCode || ""}</Text>
                            </View> :
                            <View style={styles.importantText}>
                                <Text style={styles.instruction}>Waiting for host to start the game</Text>
                                <Text style={styles.instruction}>Join Code: {this.props.route.params.lobbyCode || ""}</Text>
                            </View>
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
                                    }} text='Start Game' color='#ff2e63' />
                                </View>
                                :
                                null
                        }

                    </View>


                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                                         
                        {
                            this.state.nicknames.map((item, index) => (
                                <View key = {index} style = {styles.item}>
                                    <Text style={{fontSize: 25, fontWeight: '800', color: 'white'}}>{item}</Text>
                                </View>
                            ))
                        }

                        {this.state.loading &&
                        <View style={styles.loading}>
                            <ActivityIndicator size='large' color="#FFFFFF" animating={this.state.shouldShowActivityIndicator}/>
                        </View>
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
        width: '100%',
        alignItems: 'center',
        marginTop: '20%'
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

    importantText: {
        marginTop: '5%',
        width: '100%',
        alignItems: 'center'
      },
    
    instruction: {
        fontSize: 30,
        fontWeight: '800',
        width: 450,
        color: 'white',
        marginTop: 15,
        textAlign: 'center',
        paddingHorizontal: 20
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 30,
        marginTop: 15,
        marginBottom: 5,
        borderColor: '#000000',
        borderWidth: 5,
        backgroundColor: '#ff2e63',
        borderRadius: 30
    },
    button1: {
        marginTop: '0%',
        alignItems: 'center',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingText:  {
        fontSize: 25,
        fontWeight: '800',
        color: 'white',
        marginTop: 5,
        textAlign: 'center'
    },

});

export default Waiting
