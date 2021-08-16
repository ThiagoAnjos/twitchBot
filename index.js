import { Client } from "tmi.js"
import "dotenv/config.js"
import general from "./functions/general.js"
import { dbConnect } from "./dbConnect.js";



const client = new Client({
    identity: {
        username: process.env.BOTNAME,
        password: process.env.BOTPASS
    },
    channels: process.env.CHANNELS.split(',').map(channel => channel.trim()).filter(c => c.length > 0),
    connection: {
        reconnect: true
    }
})

client.connect();
client.on('connected', (addr, port) => {
    console.log(`Bot conectado com sucesso ${addr}:${port}`);
});
client.on('join', (channel, username, self) => {
    if (self) {
        console.log(`Entrando no canal ${channel}`);
    } /*else {
        client.say(channel, `@${username} entrou!`);
    }*/
});

client.on('chat', async (channel, tags, message, self) => {
    let username = tags['username'];
    if (self) {
        return;
    } else {
        general.generalFunction(channel, tags, message, self, username, client);
    }
});

client.on("cheer", (channel, userstate, message) => {
    //
});