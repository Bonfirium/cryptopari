
const Web3 = require('web3')
const Config = require('./contracts/testcontract-config.json')

async function main( ) {
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    console.log('Blocks count: ' + await web3.eth.getBlockNumber( ))
    let contract = new web3.eth.Contract(Config.interface, Config.address)
    let ownerAdress = await contract.methods.getOwnerAddress( ).call( )
    console.log('Contract owner address is ' + ownerAdress)
    console.log('Owner token balance is ' + await contract.methods.getBalanceOf(ownerAdress).call( ))
    console.log('Token price is ' + web3.utils.fromWei(await contract.methods.getTokenPrice( ).call( )) + ' ETH')
}

main( )
