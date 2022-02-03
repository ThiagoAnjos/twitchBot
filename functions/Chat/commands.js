import { dbConnect } from "../../dbConnect.js";
import OlimpiadasSchema from "../../models/olimpiadasTO.js"
import respostas from "../../models/respostas.js"
import desafios from "../../models/desafios.js"
import CheersPergunta from "../../models/cheersPergunta.js"
import CheersDesafio from "../../models/cheersDesafio.js"
import Pontuacao from "../../models/pontuacao.js"
import csgo from "../csgoAPI/csgoFunctions.js"
import general from "../general.js"


async function checkCommands(channel, username, tags, message, client) {

    if (channel == '#rafakkov' || channel == '#tafasfps') {
        const args = message.split(' ');
        const msg = message.toUpperCase().split(' ');
        const command = args.shift();
        if (command.startsWith('%')) {
            switch (command) {
                /*case "%comando":
                    const trigger = args.shift();
                    const commandName = args.shift();
                    const commandResp = args.join(' ');
                    switch (trigger) {
                        case "add":
                            await dbConnect();
                            const add = new CommandSchema({
                                name: commandName.startsWith('%') ? commandName : `%${commandName}`,
                                response: commandResp
                            })

                            add.save((err) => {
                                if (err) {
                                    return client.say(channel, 'Ocorreu um erro no comando!');
                                } else {
                                    return client.say(channel, `${commandName} foi adicionado com sucesso`);
                                }
                            })
                            break;

                        case "edit":
                            await dbConnect();
                            const edit = await CommandSchema.findOne({ name: commandName.startsWith('%') ? commandName : `%${commandName}` })
                            if (!edit) {
                                return client.say(channel, `Comando não encontrado!`)
                            } else {
                                edit.response = commandResp
                            }
                            edit.save((err) => {
                                if (err) {
                                    return client.say(channel, 'Ocorreu um erro no comando!');
                                } else {
                                    return client.say(channel, `${commandName} foi atualizado com sucesso`);
                                }
                            })
                            break;

                        case "del":
                            await dbConnect();
                            const del = CommandSchema.deleteOne({ name: commandName.startsWith('%') ? commandName : `%${commandName}` })
                            if (!del.n) return client.say(channel, `Comando não encontrado!`)
                            if (!del.ok) return client.say(channel, 'Ocorreu um erro no comando!');
                            client.say(channel, `${commandName} foi removido com sucesso`);
                            break;

                        default:
                            break;
                    }
                    break;*/
                case "%piada":
                    let nota = Math.floor(Math.random() * 10);
                    let data = new Date();
                    let piada = args.join(' ');

                    await dbConnect();
                    const add = new PiadasSchema({
                        username: tags.username,
                        data: data,
                        piada: piada,
                        nota: nota

                    });
                    add.save((err) => {
                        if (err) {
                            client.say(channel, `Deu erro pra salvar a piada, mas vamos lá...`)
                            if (nota >= 0 && nota <= 2) {
                                client.say(channel, `@${tags.username} meu amigo, essa piada foi tão ruim que vou te dar nota ${nota} e um timeout`);
                                if (nota == 0) {
                                    return client.say(channel, `/timeout @${tag.username} 25`);
                                } else {
                                    return client.say(channel, `/timeout @${tag.username} ${nota * 10}`);
                                }

                            } else if (nota <= 5) {
                                return client.say(channel, `Olha @${tags.username} já vi piores. Nota ${nota} pra essa 'piada'`);
                            } else if (nota <= 7) {
                                return client.say(channel, `Puts @${tags.username}! Melhora um pouco aí vai! Eu sei que você consegue! Nota ${nota} por essa!`);
                            } else if (nota <= 8) {
                                return client.say(channel, `@${tags.username} essa me surpreendeu! Parabéns! Nota ${nota} pra você!`);
                            } else {
                                return client.say(channel, `Parabéns @${tags.username}! Temos aqui o suprassumo das piadas! Nota ${nota} pra essa obra prima`);
                            }

                        } else {
                            if (nota >= 0 && nota <= 2) {
                                client.say(channel, `@${tags.username} meu amigo, essa piada foi tão ruim que vou te dar nota ${nota} e um timeout`);
                                if (nota == 0) {
                                    return client.say(channel, `/timeout @${tag.username} 25`);
                                } else {
                                    return client.say(channel, `/timeout @${tag.username} ${nota * 10}`);
                                }


                            } else if (nota <= 5) {
                                return client.say(channel, `Olha @${tags.username} já vi piores. Nota ${nota} pra essa 'piada'`);
                            } else if (nota <= 7) {
                                return client.say(channel, `Puts @${tags.username}! Melhora um pouco aí vai! Eu sei que você consegue! Nota ${nota} por essa!`);
                            } else if (nota <= 8) {
                                return client.say(channel, `@${tags.username} essa me surpreendeu! Parabéns! Nota ${nota} pra você!`);
                            } else {
                                return client.say(channel, `Parabéns @${tags.username}! Temos aqui o suprassumo das piadas! Nota ${nota} pra essa obra prima`);
                            }

                        }
                    });
                    break;
                case "%placarto":
                    await dbConnect();
                    const result = await OlimpiadasSchema.aggregate([
                        {
                            '$project': {
                                '_id': 0,
                                'admin': 0,
                                'data': 0,
                                '__v': 0
                            }
                        }, {
                            '$group': {
                                '_id': '$username',
                                'tempoTotal': {
                                    '$sum': '$tempo'
                                }
                            }
                        }, {
                            '$sort': {
                                'tempoTotal': -1
                            }
                        }
                    ])
                    //console.log(result)
                    client.say(channel, `🏅 Placar de TimeOut 🏅`);
                    let medal = ['🥇', '🥈', '🥉']
                    for (let i = 0; i < 3; i++) {
                        if (result[i].tempoTotal <= 60) {
                            client.say(channel, `${medal[i]} ${result[i]._id} com ${Math.floor(result[i].tempoTotal)} segundos de TimeOut`);
                        } else if (result[i].tempoTotal <= 3600) {
                            client.say(channel, `${medal[i]} ${result[i]._id} com ${Math.floor(result[i].tempoTotal / 60)} minutos de TimeOut`);
                        } else {
                            client.say(channel, `${medal[i]} ${result[i]._id} com ${Math.floor(result[i].tempoTotal / 3600)} horas de TimeOut`);
                        }
                    }

                    break;
                case "%resposta":
                    if ((tags['mod'] || tags['badges']?.broadcaster) && ('a' == 'b')) {
                        client.say(channel, `Pergunta respondida!`);
                        await dbConnect();
                        const newMessage = new respostas({
                            username: username,
                            channel: channel,
                            resposta: 1
                        });
                        newMessage.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`[${channel}]Mensagem salva! 🥇`)
                            }
                        })
                    } else {
                        client.say(channel, `Apenas moderadores podem usar o comando ou ainda não é a hora!`);
                    }
                    break;
                case "%desafio":
                    if ((tags['mod'] || tags['badges']?.broadcaster) && ('a' == 'b')) {
                        client.say(channel, `Desafio realizado!`);
                        await dbConnect();
                        const newMessage = new desafios({
                            username: username,
                            channel: channel,
                            resposta: 1
                        });
                        newMessage.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`[${channel}]Mensagem salva! 🥇`)
                            }
                        })
                    } else {
                        client.say(channel, `Apenas moderadores podem usar o comando ou ainda não é a hora!`);
                    }
                    break;
                case "%totalPerguntas":
                    await dbConnect();
                    let totalPerguntas = 62;
                    var perguntasPagas = await CheersPergunta.count({ bits: '100' });
                    let perguntasRespondidas = await respostas.count({});
                    let filaPerguntas = perguntasPagas - perguntasRespondidas;
                    let perguntasFaltantes = 62 - perguntasRespondidas;
                    if (filaPerguntas < 0) { filaPerguntas = 0 } else { filaPerguntas }
                    client.say(channel, `💬 Total de perguntas: ${totalPerguntas}`);
                    client.say(channel, `💲 Total de perguntas pagas: ${perguntasPagas}`);
                    client.say(channel, `✅ Total respondidas: ${perguntasRespondidas}`);
                    client.say(channel, `🛑 Ainda temos ${perguntasFaltantes} perguntas na lista! 🛑`);
                    client.say(channel, `🕐 Total na fila: ${filaPerguntas}`);
                    break;
                case "%meninos":
                    if ((tags['mod'] || tags['badges']?.broadcaster) && ('a' == 'b')) {
                        client.say(channel, `Ponto para os MENINOS 👦`);
                        await dbConnect();
                        const newMessage = new Pontuacao({
                            pontuacao: 'meninos'
                        });
                        newMessage.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`[${channel}]Mensagem salva! 🥇`)
                            }
                        })
                    } else {
                        client.say(channel, `Apenas moderadores podem usar o comando ou ainda não é a hora!!`);
                    }
                    break;
                case "%meninas":
                    if (tags['mod'] || tags['badges']?.broadcaster) {
                        client.say(channel, `Ponto para as MENINAS 👧`);
                        await dbConnect();
                        const newMessage = new Pontuacao({
                            pontuacao: 'meninas'
                        });
                        newMessage.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`[${channel}]Mensagem salva! 🥇`)
                            }
                        })
                    } else {
                        client.say(channel, `Apenas moderadores podem usar o comando ou ainda não é a hora!!`);
                    }
                    break;
                case "%totalDesafios":
                    await dbConnect();
                    let totalDesafios = 30;
                    var desafiosPagos = await CheersDesafio.count({ bits: '200' });
                    let desafiosRespondidas = await desafios.count({});
                    let filaDesafios = (desafiosPagos + 8) - desafiosRespondidas;
                    if (filaDesafios < 0) { filaDesafios = 0 } else { filaDesafios }
                    let desafiosFaltantes = 30 - desafiosRespondidas
                    client.say(channel, `💬 Total de desafios: ${totalDesafios}`);
                    client.say(channel, `💲 Total de desafios pagos: ${desafiosPagos + 8}`);
                    client.say(channel, `✅ Total de desafios executados: ${desafiosRespondidas}`);
                    client.say(channel, `🛑 Ainda temos ${desafiosFaltantes} desafios na lista! 🛑`);
                    client.say(channel, `🕐 Total na fila: ${filaDesafios}`);
                    break;
                case "%placar":
                    await dbConnect();
                    let pontosMeninos = await Pontuacao.count({ pontuacao: 'meninos' });
                    let pontosMeninas = await Pontuacao.count({ pontuacao: 'meninas' });
                    client.say(channel, `🏅 Placar atual 🏅`);
                    client.say(channel, `👧 MENINAS ${pontosMeninas + 11} X ${pontosMeninos} MENINOS 👦`);
                    break;
                case "%eventos":
                    const m = await csgo.getMatches();
                    let evts = []
                    m.forEach(evt => {
                        let nome = evt.event.name
                        if (evts.indexOf(nome) < 0) {
                            evts.push(nome)
                        } else {
                        }
                    });
                    if (evts.length > 0) {
                        client.say(channel, `Lista de eventos`)
                        evts.forEach(element => {
                            client.say(channel, `✅ ${element}`)
                        });
                    } else {
                        client.say(channel, `Não encontramos eventos no momento!`)
                    }

                    break;

                case "%partidas":
                    const matches = await csgo.getMatches();
                    let evento = msg[1];
                    console.log(evento)
                    let dt = general.shortDate();
                    dt = dt.substr(6, 2) + '/' + dt.substr(4, 2) + '/' + dt.substr(0, 4)
                    let count = 0;
                    matches.forEach(match => {
                        let splitedEventName = match.event.name.toUpperCase().split(' ');
                        if (msg.length > 0 && evento?.toUpperCase() == 'ALL') {
                            let horario = new Date(match.time)
                            horario = horario.toLocaleString('pt-BR')
                            if (dt == horario.substr(0, 10)) {
                                client.say(channel, `${match.event.name}`)
                                client.say(channel, `🆔 ${match.id} 🕑 ${horario} 🔫 ${match.teams[0].name} [${match.teams[0].id}] ❌ ${match.teams[1].name} [${match.teams[1].id}]`)
                                count++;
                            }
                        } else if (splitedEventName.indexOf(evento) >= 0) {
                            let horario = new Date(match.time)
                            horario = horario.toLocaleString('pt-BR')
                            if (dt == horario.substr(0, 10)) {
                                client.say(channel, `${match.event.name}`)
                                client.say(channel, `🆔 ${match.id} 🕑 ${horario} 🔫 ${match.teams[0].name} [${match.teams[0].id}] ❌ ${match.teams[1].name} [${match.teams[1].id}]`)
                                count++;
                            }
                        }
                    });
                    if (count == 0) {
                        client.say(channel, `Não encontramos partidas para hoje!`)
                    }
                    break;
                case "%partida":
                    break;
                case "%topplayer":
                    break;
                case "%player":
                    break;
                case "%resultado":
                    break;
                case "%times":
                    break;
                case "%time": w
                    break;
                default:
                    console.log(`as`)
                    break;
            }
        }
    }
}


export default { checkCommands }