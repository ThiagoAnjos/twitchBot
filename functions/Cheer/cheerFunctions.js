import { dbConnect } from "../../dbConnect.js";
import Cheers from "../../models/cheers.js"
import CheersPergunta from "../../models/cheersPergunta.js"
import CheersDesafio from "../../models/cheersDesafio.js"
import general from "../../functions/general.js"


async function saveCheer(channel, userstate, message) {
    const cheer = new Cheers({
        username: userstate.username,
        channel: channel,
        bits: userstate.bits,
        message: message,
        shortDate: general.shortDate(),
        fullDate: new Date()
    })
    await dbConnect();
    cheer.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`[${channel}]sucesso 💲`)
        }
    })
}

async function saveCheerPergunta(channel, userstate, message) {
    const cheer = new CheersPergunta({
        username: userstate.username,
        channel: channel,
        bits: userstate.bits,
        message: message,
        shortDate: general.shortDate(),
        fullDate: new Date()
    })
    await dbConnect();
    cheer.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`[${channel}]sucesso 💲`)
        }
    })
}

async function saveCheerDesafio(channel, userstate, message) {
    const cheer = new CheersDesafio({
        username: userstate.username,
        channel: channel,
        bits: userstate.bits,
        message: message,
        shortDate: general.shortDate(),
        fullDate: new Date()
    })
    await dbConnect();
    cheer.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`[${channel}]sucesso 💲`)
        }
    })
}

export default { saveCheer, saveCheerPergunta, saveCheerDesafio }