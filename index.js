import { Client } from "tmi.js"
import "dotenv/config.js"
import general from "./functions/general.js"
import cheer from "./functions/Cheer/cheerFunctions.js"
import timeout from "./functions/Chat/timeoutFunctions.js"


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

const clientPod = new Client({
    identity: {
        username: process.env.BOTNAME_POD,
        password: process.env.BOTPASS_POD
    },
    channels: process.env.CHANNELS_POD.split(',').map(channel => channel.trim()).filter(c => c.length > 0),
    connection: {
        reconnect: true
    }
})

client.connect();
client.on('connected', (addr, port) => {
    console.log(`[#fiscalDePintada] Bot conectado com sucesso ${addr}:${port}`);
});
client.on('join', (channel, username, self) => {
    if (self) {
        console.log(`[#fiscalDePintada] Entrando no canal ${channel}`);
    }
});

clientPod.connect();
clientPod.on('connected', (addr, port) => {
    console.log(`[#pausaProBot] Bot conectado com sucesso ${addr}:${port}`);
});
clientPod.on('join', (channel, username, self) => {
    if (self) {
        console.log(`[#pausaProBot] Entrando no canal ${channel}`);
    }
});

// Verifica as mensagens que chegam no chat
client.on('chat', async (channel, tags, message, self) => {
    let username = tags['username'];
    if (self) {
        return;
    } else {
        general.generalFunction(channel, tags, message, self, username, client);
    }
});

clientPod.on('chat', async (channel, tags, message, self) => {
    let username = tags['username'];
    if (self) {
        return;
    } else {
        general.generalFunction(channel, tags, message, self, username, clientPod);
    }
});

// Verifica quando recebe um Cheer [bit]
client.on("cheer", (channel, userstate, message) => {
    cheer.saveCheer(channel, userstate, message);
    if (userstate.bits = 100) {
        cheer.saveCheerPergunta(channel, userstate, message);
    } else if (userstate.bits = 200) {
        cheer.saveCheerDesafio(channel, userstate, message);
    }
});

// Usu??rio recebe timeout
client.on("timeout", async (channel, username, reason, duration, userstate) => {
    await timeout.saveTimeout(channel, username, reason, duration, userstate);
    console.log(`${channel} : ${username} : ${reason} : ${duration} : ${userstate}`);
});


// Fun????es n??o implementadas //


// Usu??rio continua com o Sub que recebeu de um an??nimo
client.on("anongiftpaidupgrade", (channel, username, userstate) => {
    console.log(channel, username, userstate);
});

// Usu??rio continua com o Sub que recebeu de algu??m [sender]
client.on("giftpaidupgrade", (channel, username, sender, userstate) => {
    console.log(channel, username, sender, userstate)
});

// Usu??rio d?? resub [sequ??ncia de x meses]
client.on("resub", (channel, username, months, message, userstate, methods) => {
    // Do your stuff.
    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
    console.log(channel, username, months, message, userstate, methods, cumulativeMonths)
});

// Usu??rio d?? sub para algu??m
client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    // Do your stuff.
    let senderCount = ~~userstate["msg-param-sender-count"];
    console.log(channel, username, streakMonths, recipient, methods, userstate, senderCount)
});

// Usu??rio d?? sub para o canal
client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
    // Do your stuff.
    let senderCount = ~~userstate["msg-param-sender-count"];
    console.log(channel, username, numbOfSubs, methods, userstate, senderCount)
});

// Usu??rio da sub no caral
client.on("subscription", (channel, username, method, message, userstate) => {
    // Do your stuff.
    console.log(channel, username, method, message, userstate)
});

// Usu??rio recebe timeout
/*
client.on("timeout", (channel, username, reason, duration, userstate) => {
    console.log(`${channel} : ${username} : ${reason} : ${duration} : ${userstate[]}`)
    // #rafakkov : thezig21 : null : 5 : [object Object]
*/



// Verifica quando recebe um Cheer [bit]
client.on("cheer", (channel, userstate, message) => {
    cheer.saveCheer(channel, userstate, message);
    if (userstate.bits = 100) {
        cheer.saveCheerPergunta(channel, userstate, message);
    } else if (userstate.bits = 200) {
        cheer.saveCheerDesafio(channel, userstate, message);
    }
});

// Usu??rio recebe timeout
client.on("timeout", async (channel, username, reason, duration, userstate) => {
    await timeout.saveTimeout(channel, username, reason, duration, userstate);
    console.log(`${channel} : ${username} : ${reason} : ${duration} : ${userstate}`);
});


// Usu??rio continua com o Sub que recebeu de um an??nimo
clientPod.on("anongiftpaidupgrade", (channel, username, userstate) => {
    console.log(channel, username, userstate);
});

// Usu??rio continua com o Sub que recebeu de algu??m [sender]
clientPod.on("giftpaidupgrade", (channel, username, sender, userstate) => {
    console.log(channel, username, sender, userstate)
});

// Usu??rio d?? resub [sequ??ncia de x meses]
clientPod.on("resub", (channel, username, months, message, userstate, methods) => {
    // Do your stuff.
    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
    console.log(channel, username, months, message, userstate, methods, cumulativeMonths)
});

// Usu??rio d?? sub para algu??m
clientPod.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    // Do your stuff.
    let senderCount = ~~userstate["msg-param-sender-count"];
    console.log(channel, username, streakMonths, recipient, methods, userstate, senderCount)
});

// Usu??rio d?? sub para o canal
clientPod.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
    // Do your stuff.
    let senderCount = ~~userstate["msg-param-sender-count"];
    console.log(channel, username, numbOfSubs, methods, userstate, senderCount)
});

// Usu??rio da sub no caral
clientPod.on("subscription", (channel, username, method, message, userstate) => {
    // Do your stuff.
    console.log(channel, username, method, message, userstate)
});
