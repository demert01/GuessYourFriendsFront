import Game from './Game'
const client = require('../client');

exports.get_game_for_join_code = async (joinCode, newDeviceId) => {
    let gamePromise = new Promise((resolve, reject) => {
        client.post('/api/game/join', {newDeviceId: newDeviceId, joinCode: joinCode})
            .then((response) => {
                const joinedGameCode = response.data.game.joinCode;
                const joinedGameDeviceIds = response.data.game.deviceIds;
                resolve(new Game(joinedGameDeviceIds, joinedGameCode));
            })
            .catch(err => {
                reject(err);
            });
    });

    return await gamePromise.catch(err => {
        throw new Error(err.message || "There was a problem joining the game")
    });
};
