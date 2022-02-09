import axios from 'axios'
import 'dotenv/config.js'

async function getToken() {
    let url = `${process.env.GET_TOKEN}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`;
    try {
        const response = await axios.post(url)
        return response.data.access_token;

    } catch (error) {
        console.log(error.response.body);
    }
}

async function getChannelInfo(roomID) {
    let URL = `${process.env.GET_BROADCASTER}${roomID}`
    let r;
    await axios.get(URL, {
        headers:
        {
            'Authorization': `Bearer ${await getToken()}`,
            'Client-Id': process.env.CLIENT_ID
        }
    })
        .then(async response => {
            r = await response.data.data;
        })
        .catch((error) => {
            console.log('error ' + error);
        });
    return r;
}


export default { getChannelInfo }