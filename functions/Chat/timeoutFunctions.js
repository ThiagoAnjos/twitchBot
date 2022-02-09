import timeout from "../../models/timeout.js";
import { dbConnect } from "../../dbConnect.js";
import general from "../general.js";

async function saveTimeout(channel, username, reason, duration, userstate) {
    await dbConnect();
    const newTimeout = new timeout({
        username: username,
        channel: channel,
        duration: duration,
        reason: reason,
        shortDate: general.shortDate(),
        fullDate: new Date()
    });
    console.log(newTimeout);
    newTimeout.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`[${channel}]Timeout salvo! 🕙`)
        }
    })
    return;

}
export default { saveTimeout }