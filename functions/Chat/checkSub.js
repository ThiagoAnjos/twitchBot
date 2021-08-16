import { dbConnect } from "../../dbConnect.js";
import primeUsers from "../../models/primeUser.js";
import general from "../general.js"
import primeMessages from "../../models/primeMessages.js"

async function checkSub(channel, tags, username, client) {
    var shortDateYYYYMM = general.shortDateYYYYMM();
    await dbConnect();
    var rtrn = await primeMessages.find();
    let random = Math.floor(Math.random() * rtrn.length);
    if (tags['badges']?.premium === '1' && (tags['subscriber'] === false) && !tags['badge-info']?.founder) {
        //if (true) {
        await dbConnect();
        const exists = await primeUsers.findOne({ username: username, shortDate: shortDateYYYYMM });
        if (!exists) {
            client.say(channel, `@${username}${rtrn[random].message}`);
            const primeUser = new primeUsers({
                username: username,
                channel: channel,
                shortDate: shortDateYYYYMM,
                fullDate: new Date()
            });

            primeUser.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`sucesso 🥇`)
                }
            })
        }
    }
}

export default { checkSub };