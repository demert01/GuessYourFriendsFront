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
                const votesByQuestion = response.data.game.votesByQuestion;
                const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
                const showScoreTime = response.data.game.showScoreTime;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
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
                const votesByQuestion = response.data.game.votesByQuestion;
                const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
                const showScoreTime = response.data.game.showScoreTime;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
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
               const votesByQuestion = response.data.game.votesByQuestion;
               const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
               const showScoreTime = response.data.game.showScoreTime;
              resolve(new Game(gameDeviceIds, newGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
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
                const votesByQuestion = response.data.game.votesByQuestion;
                const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
                const showScoreTime = response.data.game.showScoreTime;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
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
                const votesByQuestion = response.data.game.votesByQuestion;
                const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
                const showScoreTime = response.data.game.showScoreTime;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
            })
            .catch(err => {
                reject(err);
            });
    });

    return await gamePromise.catch(err => {
        throw new Error(err.message || "There was a problem starting the game");
    });
};

exports.vote = async (joinCode, questionNumber, votedFor, deviceId) => {
  let gamePromise = new Promise(((resolve, reject) => {
      client.post('/api/game/vote', {joinCode: joinCode, deviceId: deviceId, votedFor: votedFor, questionNumber: questionNumber})
          .then((response) => {
              const joinedGameCode = response.data.game.joinCode;
              const joinedGameDeviceIds = response.data.game.deviceIds;
              const started = response.data.game.started;
              const readyPlayers = response.data.game.readyPlayers;
              const gameStartTime = response.data.game.gameStartTime;
              const questionSet = response.data.game.questionSet;
              const questions = response.data.game.questions;
              const votesByQuestion = response.data.game.votesByQuestion;
              const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
              const showScoreTime = response.data.game.showScoreTime;
              resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
          })
          .catch(err => {
              console.log(joinCode);
              console.log(deviceId);
              console.log(votedFor);
              console.log(questionNumber);
              console.log(err.response.data.message);
              reject(err);
          });
  }));

  return await gamePromise;
};

exports.check_ready_next_question = async (joinCode, questionNumber) => {
    let gamePromise = new Promise(((resolve, reject) => {
        client.post('/api/game/nextQuestion', {joinCode: joinCode, questionNumber: questionNumber})
            .then((response) => {
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                const started = response.data.game.started;
                const readyPlayers = response.data.game.readyPlayers;
                const gameStartTime = response.data.game.gameStartTime;
                const questionSet = response.data.game.questionSet;
                const questions = response.data.game.questions;
                const votesByQuestion = response.data.game.votesByQuestion;
                const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
                const showScoreTime = response.data.game.showScoreTime;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
            })
            .catch(err => {
                console.log(err.response.data.message);
                reject(err);
            });
    }));

    return await gamePromise;
};

exports.move_to_scores = async (joinCode) => {
    console.log("CALLED");
    let gamePromise = new Promise(((resolve, reject) => {
        client.post('/api/game/moveToScores', {joinCode: joinCode})
            .then((response) => {
                console.log(response.data.game);
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                const started = response.data.game.started;
                const readyPlayers = response.data.game.readyPlayers;
                const gameStartTime = response.data.game.gameStartTime;
                const questionSet = response.data.game.questionSet;
                const questions = response.data.game.questions;
                const votesByQuestion = response.data.game.votesByQuestion;
                const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
                const showScoreTime = response.data.game.showScoreTime;
                console.log("RESOLVING PROMISE");
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
            })
            .catch(err => {
                console.log(err.response.data.message);
                reject(err);
            });
    }));

    return await gamePromise;
};

exports.move_to_next_round = async (joinCode) => {
    let gamePromise = new Promise(((resolve, reject) => {
        client.post('/api/game/moveToNextRound', {joinCode: joinCode})
            .then((response) => {
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                const started = response.data.game.started;
                const readyPlayers = response.data.game.readyPlayers;
                const gameStartTime = response.data.game.gameStartTime;
                const questionSet = response.data.game.questionSet;
                const questions = response.data.game.questions;
                const votesByQuestion = response.data.game.votesByQuestion;
                const nextQuestionStartTime = response.data.game.nextQuestionStartTime;
                const showScoreTime = response.data.game.showScoreTime;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode, started, readyPlayers, gameStartTime, questionSet, questions, votesByQuestion, nextQuestionStartTime, showScoreTime));
            })
            .catch(err => {
                console.log(err.response.data.message);
                reject(err);
            });
    }));

    return await gamePromise;
};
