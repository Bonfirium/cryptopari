
const NetType = {
    Kovan: "kovan",
    Ropsten: "ropsten",
};

const netType = NetType.Ropsten;

const Web3 = require('web3');
const Config = require('../config.json');
const ContractConfig = require('../contracts/testcontract-config.json');

async function main() {
    let web3 = new Web3(new Web3.providers.HttpProvider(Config.httpProvider.netType));
    console.log('Blocks count: ' + await web3.eth.getBlockNumber());
    let contract = new web3.eth.Contract(ContractConfig.interface, ContractConfig.address.netType);
    let ownerAddress = await contract.methods.getOwnerAddress().call();
    console.log('Contract owner address is ' + ownerAddress);
    console.log('Owner token balance is ' + await contract.methods.getBalanceOf(ownerAddress).call());
    console.log('Token price is ' + web3.utils.fromWei(await contract.methods.getTokenPrice().call()) + ' ETH');
}

main();
