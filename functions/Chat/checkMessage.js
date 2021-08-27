import { dbConnect } from "../../dbConnect.js";
import messages from "../../models/messages.js"
import general from "../general.js"
import Commads from "../Chat/commands.js"
import twitchApi from "../twitchAPI/apiFunctions.js"
import MelhorEnvio from "../melhorEnvioAPI/meFunctions.js"

async function checkMessage(channel, tags, username, client, message) {
    await saveMessage(channel, username, tags, message);
    //await taxar(channel, username, tags, message, client);
    //await Commads.checkCommands(channel, username, tags, message, client);
    if (channel == '#rafakkov') {
        MelhorEnvio.calculaFrete(message, tags, channel, client);
    }
}

async function saveMessage(channel, username, tags, message) {
    await dbConnect();
    let infos = await twitchApi.getChannelInfo(tags['room-id']);
    const newMessage = new messages({
        username: username,
        displayName: tags['display-name'],
        channel: channel,
        channelId: tags['room-id'],
        messageId: tags['id'],
        message: message,
        channelGame: infos[0].game_name,
        channelGameId: infos[0].game_id,
        channelTitle: infos[0].title,
        shortDate: general.shortDate(),
        fullDate: new Date()
    });
    console.log(newMessage);
    newMessage.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`[${channel}]Mensagem salva! 🥇`)
        }
    })
    return;
}

async function taxar(channel, username, tags, message, client) {
    const msg = message.toUpperCase().split(' ');
    if (msg.indexOf('TAXAR') >= 0) {
        let data = new Date();

        if (tags['mod'] || tags['badges']?.broadcaster) {

            client.say(channel, `Sim mestre ${tags['username']}! ${msg[2]} vai 🍼 por ${msg[3]} s`);
            /***/
            await dbConnect();
            const timeOut = new OlimpiadasSchema({
                admin: tags.username,
                username: msg[2],
                data: data,
                tempo: msg[3]
            });

            timeOut.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`sucesso 🥇`)
                }
            })
            client.timeout(channel, msg[2], msg[3]);
        } else {
            client.say(channel, `@${tags['username']}, quem é você na fila do pão ? `);
            client.say(channel, `@${tags['username']}, toma um TO pra largar de ser besta!`);

            await dbConnect();
            const timeOut = new OlimpiadasSchema({
                admin: 'CHAT',
                username: `@${tags.username}`,
                data: data,
                tempo: msg[3]
            });

            timeOut.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`sucesso 🥇`)
                }
            })
            client.timeout(channel, tags['username'], msg[3]);
        }
    }
}

async function calculaFrete(channel, username, tags, message, client) {
    if (channel == '#rafakkov') {
        const msg = message.toUpperCase().split(' ');
        console.log(msg)
    }
}

export default { checkMessage };