# Detalhes do Projeto - Twitch Bot

## 📋 Visão Geral

Este é um bot para Twitch desenvolvido em Node.js que interage com chats de canais da plataforma. O bot possui funcionalidades de moderação, interação com espectadores, gerenciamento de perguntas e desafios pagos com bits, integração com APIs de CS:GO, e muito mais.

## 🏗️ Estrutura do Projeto

```
/workspace
├── index.js                    # Arquivo principal de entrada
├── dbConnect.js                # Configuração de conexão com MongoDB
├── package.json                # Dependências e configurações do projeto
├── models/                     # Modelos Mongoose (schemas do banco de dados)
│   ├── cheers.js
│   ├── cheersPergunta.js
│   ├── cheersDesafio.js
│   ├── messages.js
│   ├── timeout.js
│   ├── perguntasFeitas.js
│   ├── perguntasCast.js
│   ├── desafios.js
│   ├── respostas.js
│   ├── pontuacao.js
│   ├── olimpiadasTO.js
│   ├── primeUser.js
│   └── primeMessages.js
└── functions/                  # Módulos de funcionalidades
    ├── general.js              # Funções gerais
    ├── Chat/                   # Funções relacionadas ao chat
    │   ├── checkMessage.js
    │   ├── checkSub.js
    │   ├── commands.js
    │   └── timeoutFunctions.js
    ├── Cheer/                   # Funções relacionadas a bits/cheers
    │   └── cheerFunctions.js
    ├── csgoAPI/                 # Integração com API de CS:GO
    │   └── csgoFunctions.js
    ├── twitchAPI/               # Funções da API da Twitch
    │   └── apiFunctions.js
    ├── Subscribers/             # Funções de assinantes
    │   └── subscribersFunctions.js
    ├── melhorEnvioAPI/          # Integração com API Melhor Envio
    │   └── meFunctions.js
    └── Host/                    # Funções de host
        └── hostFunctions.js
```

## 🛠️ Tecnologias Utilizadas

### Dependências Principais

- **tmi.js** (v1.8.3): Biblioteca para interação com o IRC da Twitch
- **mongoose** (v5.13.6): ODM para MongoDB
- **axios** (v0.21.1): Cliente HTTP para requisições
- **dotenv** (v10.0.0): Gerenciamento de variáveis de ambiente
- **hltv-api** (v3.0.0): API para dados de CS:GO/HLTV
- **request** (v2.88.2): Biblioteca HTTP (legacy)
- **nodemon** (v2.0.15): Ferramenta de desenvolvimento para auto-reload

### Configuração

- **Node.js**: Projeto utiliza módulos ES6 (`"type": "module"`)
- **Banco de Dados**: MongoDB (via Mongoose)

## 🤖 Funcionalidades Principais

### 1. Conexão com Twitch

O bot utiliza dois clientes separados:
- **fiscaldepintada**: Bot principal
- **pausaprobot**: Bot secundário

Ambos se conectam a múltiplos canais configurados via variáveis de ambiente.

### 2. Sistema de Comandos

O bot responde a comandos iniciados com `%`. Principais comandos:

#### Comandos Gerais
- `%piada`: Sistema de avaliação de piadas com notas aleatórias
- `%placarto`: Placar de timeouts (top 3 usuários)
- `%nota @usuário`: Avalia um usuário com nota aleatória
- `%taxar @usuário tempo`: Aplica timeout (apenas mods/broadcasters)

#### Comandos de Perguntas e Desafios
- `%totalPerguntas`: Mostra estatísticas de perguntas pagas
- `%totalDesafios`: Mostra estatísticas de desafios pagos
- `%resposta`: Marca pergunta como respondida (mods/broadcasters)
- `%desafio`: Marca desafio como realizado (mods/broadcasters)

#### Comandos de Pontuação
- `%meninos`: Adiciona ponto para os meninos (mods/broadcasters)
- `%meninas`: Adiciona ponto para as meninas (mods/broadcasters)
- `%placar`: Mostra placar atual meninos vs meninas

#### Comandos de CS:GO
- `%eventos`: Lista eventos de CS:GO disponíveis
- `%partidas [evento]`: Lista partidas do dia (filtro por evento opcional)
- `%topplayers`: Top 5 jogadores de CS:GO (HLTV - All Time)
- `%player [id]`: Informações de um jogador específico
- `%times`: Top 5 times de CS:GO
- `%time [id]`: Informações de um time específico

### 3. Sistema de Bits/Cheers

O bot monitora e salva todos os bits recebidos:
- **100 bits**: Registra como pergunta paga
- **200 bits**: Registra como desafio pago
- Todos os bits são salvos no banco de dados com informações do usuário, canal, mensagem e data

### 4. Sistema de Timeouts

- Monitora e registra todos os timeouts aplicados
- Mantém estatísticas de tempo total de timeout por usuário
- Sistema de "Olimpíadas de Timeout" com ranking

### 5. Sistema de Mensagens

- Salva todas as mensagens do chat com metadados:
  - Username e display name
  - Canal e ID da mensagem
  - Jogo sendo transmitido
  - Título do canal
  - Data completa e resumida

### 6. Sistema de Assinantes

- Monitora eventos de subscription
- Eventos implementados (mas não totalmente funcionais):
  - `subscription`: Nova assinatura
  - `resub`: Renovação de assinatura
  - `subgift`: Presente de assinatura
  - `submysterygift`: Presente misterioso de assinatura
  - `giftpaidupgrade`: Upgrade de presente
  - `anongiftpaidupgrade`: Upgrade de presente anônimo

## 📊 Modelos de Dados (MongoDB)

### Principais Collections

1. **cheers**: Todos os bits recebidos
2. **cheersPergunta**: Bits de 100 (perguntas pagas)
3. **cheersDesafio**: Bits de 200 (desafios pagos)
4. **messages**: Todas as mensagens do chat
5. **timeout**: Registros de timeouts
6. **olimpiadasTO**: Dados para ranking de timeouts
7. **perguntasFeitas**: Perguntas feitas no chat
8. **perguntasCast**: Perguntas do cast
9. **desafios**: Desafios realizados
10. **respostas**: Respostas dadas
11. **pontuacao**: Sistema de pontuação (meninos vs meninas)
12. **primeUser**: Usuários Prime
13. **primeMessages**: Mensagens Prime

## 🔧 Configuração

### Variáveis de Ambiente Necessárias

O projeto requer um arquivo `.env` com as seguintes variáveis:

```env
# Credenciais do Bot Principal
BOTNAME=fiscaldepintada
BOTPASS=oauth_token_aqui
CHANNELS=canal1,canal2,canal3

# Credenciais do Bot Secundário
BOTNAME_POD=pausaprobot
BOTPASS_POD=oauth_token_aqui
CHANNELS_POD=canal1,canal2

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/twitchbot
```

## 🚀 Como Executar

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente no arquivo `.env`

3. Executar o bot:
```bash
node index.js
```

Ou com nodemon para desenvolvimento:
```bash
nodemon index.js
```

## 📝 Observações Importantes

### Código Duplicado
- Há código duplicado no `index.js` (eventos de cheer e timeout aparecem duas vezes)
- Alguns comandos têm lógica duplicada (ex: `%taxar` aparece duas vezes)

### Funcionalidades Não Implementadas
- Vários eventos de subscription estão apenas logando no console
- Alguns comandos têm condições que nunca são verdadeiras (ex: `'a' == 'b'`)
- Sistema de comandos customizados está comentado

### Bugs Conhecidos
- No código de `%piada`, há referências a `tag.username` que deveriam ser `tags.username`
- Alguns comandos têm lógica de validação que pode não funcionar corretamente

## 🎯 Casos de Uso

Este bot é ideal para:
- Streamers que querem interagir com a audiência através de perguntas e desafios pagos
- Canais de CS:GO que querem mostrar informações sobre partidas e times
- Canais que precisam de moderação automatizada e estatísticas
- Streamers que querem gamificar a experiência com sistemas de pontuação

## 📈 Melhorias Sugeridas

1. Remover código duplicado
2. Implementar completamente os eventos de subscription
3. Corrigir bugs de referência de variáveis
4. Adicionar tratamento de erros mais robusto
5. Implementar sistema de logs mais estruturado
6. Adicionar testes automatizados
7. Melhorar validação de comandos
8. Implementar sistema de comandos customizados que está comentado

## 📄 Licença

ISC

## 👤 Autor

Não especificado no `package.json`

---

**Última atualização**: Março 2026
