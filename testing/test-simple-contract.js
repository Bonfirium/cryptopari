const Web3 = require('web3');
const Config = require('../config.json');
const ContractConfig = require('../contracts/testcontract-config.json');

async function main() {
    let web3 = new Web3(new Web3.providers.HttpProvider(Config.httpProvider));

    console.log('Blocks count: ' + await web3.eth.getBlockNumber());
    let contract = new web3.eth.Contract(ContractConfig.interface, ContractConfig.address);
    let ownerAddress = await contract.methods.getOwnerAddress().call();
    console.log('Contract owner address is ' + ownerAddress);
    console.log('Owner token balance is ' + await contract.methods.getBalanceOf(ownerAddress).call());
    console.log('Token price is ' + web3.utils.fromWei(await contract.methods.getTokenPrice().call()) + ' ETH');



}

main();
