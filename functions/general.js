import Subscribe from "./Chat/checkSub.js";
import Message from "./Chat/checkMessage.js"

function generalFunction(channel, tags, message, self, username, client) {

    Subscribe.checkSub(channel, tags, username, client);
    Message.checkMessage(channel, tags, username, client, message);

}

function shortDate() {
    var data = new Date().toISOString().split('T');
    return data[0].split('-').join('');
}

function shortDateYYYYMM() {
    var data = new Date().toISOString().split('T');
    let newData = []
    data = data[0].split('-')
    return newData.concat(data[0], data[1]).join('');
}


export default {
    generalFunction,
    shortDate,
    shortDateYYYYMM
};
