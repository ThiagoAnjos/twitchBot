import axios from 'axios'
import 'dotenv/config.js'
/*
awp 130x40x8 com 2,4kg
*/

async function calculaFrete(message, tags, channel, client) {
    let tipo = {};
    let msg = message.toUpperCase().split(' ');
    if (msg[0].startsWith('%')) {
        if (msg[0].split('%')[1] == 'FRETE') {
            client.deletemessage(channel, tags['id']).then(function (response) { }).catch(function (error) { });
            if (msg[1]?.length == 8) {
                switch (msg[2]) {
                    case 'PISTOL':
                        tipo = {
                            "height": 45,
                            "width": 35,
                            "length": 8,
                            "weight": 0.7
                        }
                        break;
                    case 'AK':
                        tipo = {
                            "height": 98,
                            "width": 40,
                            "length": 8,
                            "weight": 1.8
                        }
                        break;
                    case 'M4':
                        tipo = {
                            "height": 98,
                            "width": 40,
                            "length": 8,
                            "weight": 1.8
                        }
                        break;
                    case 'ARMA':
                        tipo = {
                            "height": 98,
                            "width": 40,
                            "length": 8,
                            "weight": 1.8
                        }
                        break;
                    case 'AWP':
                        tipo = {
                            "height": 130,
                            "width": 30,
                            "length": 8,
                            "weight": 2.4
                        }
                        break;
                    default:
                        client.say(channel, `@${tags['username']}, não identifiquei o que você pediu! Para ver a estimativa do frete use o comando %frete {CEP} {PISTOL/AK/M4/AWP}. Ex: %frete 12345678 pistol`)
                        break;
                }
                var data = JSON.stringify({
                    "from": {
                        "postal_code": "07097420"
                    },
                    "to": {
                        "postal_code": msg[1]
                    },
                    "package": tipo
                });
                var config = {
                    method: 'post',
                    url: 'https://melhorenvio.com.br/api/v2/me/shipment/calculate',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.ME_TOKEN}`,
                        'User-Agent': 'dosAnjos [tafas.anjos@gmail.com]'
                    },
                    data: data
                };
                if (tipo.height) {
                    let r = await calcula(config, client, channel, tags);
                    return r;
                }

            } else {
                client.say(channel, `@${tags['username']}, dá uma olhada se o contém os 8 dígitos do frete sem hífen e se contém todos os parâmetros necessários. Ex: %frete 12345678 pistol {PISTOL/AK/M4/AWP}`);
            }
        } else {
            // COMANDO NÃO FOI FRETE
        }
    }


}

async function calcula(config, client, channel, tags) {
    let res;
    await axios(config)
        .then(function (response) {
            res = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    if (res) {
        for (let e of res) {
            if (e.price) {
                client.say(channel, `@${tags['username']} - 📦 ${e.name} [${e.company.name}] | 💲${e.price} 🕑 ${e.custom_delivery_range.min}-${e.custom_delivery_range.max}`)
            }
        }
    }
}

export default { calculaFrete }