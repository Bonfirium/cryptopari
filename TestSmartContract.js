const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io"));

var CoursetroContract = web3.eth.contract([{
    "constant": true,
    "inputs": [],
    "name": "getOwnerAddress",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getBalance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "count", "type": "uint256"}],
    "name": "buyTokens",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getTokenPrice",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "count", "type": "uint256"}],
    "name": "sellTokens",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "destroy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "sellTokens",
    "outputs": [{"name": "soldTokensCount", "type": "uint256"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "adr", "type": "address"}],
    "name": "getBalanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "buyTokens",
    "outputs": [{"name": "boughtTokensCount", "type": "uint256"}],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}]);

let contractUid = '0x3630adc02417ccb1c037cccd4fbc6c32ff4a1bd4';
var Coursetro = CoursetroContract.at(contractUid);

console.log(web3.eth.accounts);

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
