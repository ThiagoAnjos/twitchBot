import HLTV from 'hltv-api'
import axios from 'axios'

async function getMatches() {
    const matches = await HLTV.default.getMatches()
    return matches;

};

async function getTopPlayers() {
    const players = await HLTV.default.getTopPlayers()
    return players;

};

async function getPlayerById(playerId) {
    try {
        const player = await HLTV.default.getPlayerById(playerId)
        return player
    } catch (e) {
        console.log(e)
    }
};

async function getTopTeams() {
    const teams = await HLTV.default.getTopTeams()
    return teams;
}

async function getTeamById(teamId) {
    const team = await HLTV.default.getTeamById(teamId)
    return team;
}

export default { getMatches, getTopPlayers, getPlayerById, getTopTeams, getTeamById }