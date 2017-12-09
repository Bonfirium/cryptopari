const Web3 = require('web3');
const Config = require('./contracts/testcontract-config.json')

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var CoursetroContract = web3.eth.contract(Config.interface);
let contractUid = Config.address;
var Coursetro = CoursetroContract.at(contractUid);

console.log('Blocks count: ' + web3.eth.blockNumber);

//1
let balance = web3.fromWei(Coursetro.getTokenPrice().toNumber(), 'ether');
console.log(balance);

//2
let ownerAdress = Coursetro.getOwnerAddress();
console.log(ownerAdress);

//3
console.log(web3.fromWei(Coursetro.getBalanceOf(ownerAdress).toNumber(), "ether"));

//4
console.log(Coursetro.getBalance());

//5
// Coursetro.destroy();

//6
