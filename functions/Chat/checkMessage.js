import { dbConnect } from "../../dbConnect.js";
import messages from "../../models/messages.js"
import general from "../general.js"

async function checkMessage(channel, tags, username, client, message) {
    await saveMessage(channel, username, tags, message);
}

async function saveMessage(channel, username, tags, message) {
    await dbConnect();
    const newMessage = new messages({
        username: username,
        channel: channel,
        message: message,
        shortDate: general.shortDate(),
        fullDate: new Date()
    });

    newMessage.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`[${channel}]Mensagem salva! 🥇`)
        }
    })
    return;
}

export default { checkMessage };