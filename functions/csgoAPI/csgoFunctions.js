import HLTV from 'hltv-api'
import axios from 'axios'

async function getMatches() {
    const matches = await HLTV.default.getMatches()
    return matches;

};

export default { getMatches }