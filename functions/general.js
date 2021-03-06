import Subscribe from "./Chat/checkSub.js";
import Message from "./Chat/checkMessage.js"
import CheersPergunta from "../models/cheersPergunta.js"
import CheersDesafio from "../models/cheersDesafio.js"

function generalFunction(channel, tags, message, self, username, client) {

    Subscribe.checkSub(channel, tags, username, client);
    Message.checkMessage(channel, tags, username, client, message);

}

function shortDate() {
    var data = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).split(' ');
    let a = data[0].split('/');
    let short = [];
    short.push(a[2]);
    short.push(a[1]);
    short.push(a[0]);
    return short.join('');
}

function shortDateYYYYMM() {
    var data = new Date().toISOString().split('T');
    let newData = []
    data = data[0].split('-')
    return newData.concat(data[0], data[1]).join('');
}

async function getTotalPerguntasPagas() {
    let total;
    await CheersPergunta.countDocuments({}, function (err, count) {
        total = count;
    })
    total;
}

function getTotalDesafiosPagos() {
    CheersDesafio.countDocuments({}, function (err, count) {
        count;
    })
    count;
}

export default {
    generalFunction,
    shortDate,
    shortDateYYYYMM,
    getTotalPerguntasPagas,
    getTotalDesafiosPagos
};
