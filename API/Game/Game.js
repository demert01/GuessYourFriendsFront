class Game {
    constructor(deviceIds, joinCode, started, readyPlayers) { // Need to add question list and category
        // device ids contains array of all nicknames of game participants
        this.deviceIds = deviceIds;
        this.joinCode = joinCode;
        this.started = started;
        this.readyPlayers = readyPlayers;
    }
}

export default Game
