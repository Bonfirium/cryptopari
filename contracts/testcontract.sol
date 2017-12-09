pragma solidity ^0.4.19;

contract F4CTest {

    uint constant TOKEN_PRICE = 50000000000000000; // 0.05 eth

    mapping (address => uint) balances;
    address owner;

    function F4CTest( ) public {
        owner = msg.sender;
    }

    function getOwnerAddress( ) constant public returns (address) {
        return owner;
    }

    function getTokenPrice( ) pure public returns (uint) {
        return TOKEN_PRICE;
    }

    function getBalanceOf(address adr) constant public returns (uint) {
        return balances[adr];
    }

    function getBalance( ) constant public returns (uint) {
        return balances[msg.sender];
    }

    function buyTokens(uint count) payable public {
        uint cost = count * TOKEN_PRICE;
        require(cost <= msg.value);
        balances[msg.sender] += count;
        uint surrender = msg.value - cost;
        if (surrender > 0) {
            msg.sender.transfer(surrender);
        }
    }

    function buyTokens( ) payable public returns (uint boughtTokensCount) {
        uint purchasedTokensCount = msg.value / TOKEN_PRICE;
        buyTokens(purchasedTokensCount);
        return purchasedTokensCount;
    }

    function sellTokens(uint count) public {
        msg.sender.transfer(count * TOKEN_PRICE);
        balances[msg.sender] -= count;
    }

    function sellTokens( ) public returns (uint soldTokensCount) {
        uint count = balances[msg.sender];
        sellTokens(count);
        return count;
    }

    function destroy( ) public {
        require(owner == msg.sender);
        selfdestruct(owner);
    }
}
