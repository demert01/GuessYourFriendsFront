class Game {
    constructor(deviceIds, joinCode, started, readyPlayers, gameStartTime, questionSet, questions) { // Need to add question list and category
        // device ids contains array of all nicknames of game participants
        this.deviceIds = deviceIds;
        this.joinCode = joinCode;
        this.started = started;
        this.readyPlayers = readyPlayers;
        this.gameStartTime = gameStartTime;
        this.questionSet = questionSet;
        this.questions = questions;
    }
}

export default Game
