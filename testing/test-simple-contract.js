const NetType = {
    Kovan: "kovan",
    Ropsten: "ropsten",
};

const netType = NetType.Ropsten;
const Web3 = require('web3');
const Config = require('../config.json');
const ContractConfig = require('../contracts/cryptopari-config.json');
const FinishedGames = require('../bot-parser/finished-games');

async function main() {
    let web3 = new Web3(new Web3.providers.HttpProvider(Config.httpProvider));
    let contract = new web3.eth.Contract(ContractConfig.interface, ContractConfig.address[netType]);


    web3.eth.personal.sign(web3.utils.utf8ToHex("Hello world"), "0x6234c949Fb4F1039480961e67b1DC4598b2a5347", "178084Borsukm")
        .then(console.log);

    // var result = web3.eth.sign("0x6234c949Fb4F1039480961e67b1DC4598b2a5347",
    //     "93af57e47d4215973417d5dc7a9e7cd220ffbd2cfe7f53f04474e99d3a635573");
    //
    // web3.eth.getAccounts(function (error, result) {
    //     console.log(result);
    // })


    let finbot = new FinishedGames();
    await  finbot.setBodyByUrl();
    // let lastGame =  (await  finbot.getList())[0];
    //
    // await contract.methods.createGame(
    //     lastGame.teams.team1.name,
    //     lastGame.teams.team2.name,
    //     lastGame.date,
    //     lastGame.matchID,
    //     lastGame.url).call();

}

main();
