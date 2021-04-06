import Game from './Game'
const client = require('../client');

exports.get_game_for_join_code = async (joinCode, newDeviceId) => {
    let gamePromise = new Promise((resolve, reject) => {
        client.post('/api/game/join', {newDeviceId: newDeviceId, joinCode: joinCode})
            .then((response) => {
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                const started = response.data.game.started;
                const readyPlayers = response.data.game.readyPlayers;
                const gameStartTime = response.data.game.gameStartTime;
                const questionSet = response.data.game.questionSet;
                const questions = response.data.game.questions;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions));
            })
            .catch(err => {
                reject(err);
            });
    });

    return await gamePromise.catch(err => {
        throw new Error(err.message || "There was a problem joining the game");
    });
};

exports.get_game_with_join_code = async (joinCode) => {
    let gamePromise = new Promise((resolve, reject) => {
        client.post('/api/game/get', {joinCode: joinCode})
            .then((response) => {
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                const started = response.data.game.started;
                const readyPlayers = response.data.game.readyPlayers;
                const gameStartTime = response.data.game.gameStartTime;
                const questionSet = response.data.game.questionSet;
                const questions = response.data.game.questions;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions));
            })
            .catch(err => {
                reject(err);
            });
    });

    return await gamePromise.catch(err => {
        throw new Error(err.message || "There was a problem getting the game");
    });
};

exports.create_game = async (hostDeviceId, questionSet) => {
    let gamePromise = new Promise((resolve, reject) => {
       client.post('/api/game/', {hostDeviceId: hostDeviceId, questionSet: questionSet})
           .then((response) => {
              const newGameCode = response.data.game.joinCode;
              const gameDeviceIds = response.data.game.deviceIds;
               const started = response.data.game.started;
               const readyPlayers = response.data.game.readyPlayers;
               const gameStartTime = response.data.game.gameStartTime;
               const questionSet = response.data.game.questionSet;
               const questions = response.data.game.questions;
              resolve(new Game(gameDeviceIds, newGameCode, started, readyPlayers, gameStartTime, questionSet, questions));
           })
           .catch((err) => {
               reject(err);
           });

    });

    return await gamePromise.catch(err => {
       throw new Error(err.message || "There was a problem creating the game");
    });
};

exports.set_ready = async (joinCode, deviceID) => {
    let gamePromise = new Promise((resolve, reject) => {
        client.post('/api/game/ready', {deviceId: deviceID, joinCode: joinCode})
            .then((response) => {
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                const started = response.data.game.started;
                const readyPlayers = response.data.game.readyPlayers;
                const gameStartTime = response.data.game.gameStartTime;
                const questionSet = response.data.game.questionSet;
                const questions = response.data.game.questions;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions));
            })
            .catch(err => {
                reject(err);
            });
    });

    return await gamePromise.catch(err => {
        throw new Error(err.message || "There was a problem joining the game");
    });
};

exports.start_game = async (joinCode, hostDeviceId) => {
    let gamePromise = new Promise((resolve, reject) => {
        client.post('/api/game/start', {joinCode: joinCode, hostDeviceId: hostDeviceId})
            .then((response) => {
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                const started = response.data.game.started;
                const readyPlayers = response.data.game.readyPlayers;
                const gameStartTime = response.data.game.gameStartTime;
                const questionSet = response.data.game.questionSet;
                const questions = response.data.game.questions;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions));
            })
            .catch(err => {
                reject(err);
            });
    });

    return await gamePromise.catch(err => {
        throw new Error(err.message || "There was a problem starting the game");
    });
};
