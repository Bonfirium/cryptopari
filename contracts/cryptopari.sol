pragma solidity ^0.4.19;

contract Owned {
    function Owned() public {
        owner = msg.sender;
    }
    address owner;
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

contract CryptoPari is Owned {

    modifier conservatingGasTax {
        usedGas += msg.gas * tx.gasprice;
        _;
    }

    struct Pari {
        uint value;
        bool forLeft;
    }

    enum GameStatus {
        Betting,
        Pending,
        LeftWin,
        RightWin
    }

    struct Game {
        string left;
        string right;
        uint timestamp;
        GameStatus status;
        address[] gamblers;
        mapping (address => Pari) bets;
    }

    Game[] games;
    mapping (address => uint) prizes;
    address owner;
    uint usedGas;

    function CryptoPari() public conservatingGasTax {
        owner = msg.sender;
    }

    function getUsedGas() public constant returns (uint) {
        return usedGas;
    }

    function placeBet(uint32 gameId, bool forLeft) public payable {
        require(gameId < games.length);
        require(games[gameId].status == GameStatus.Betting);
        require(games[gameId].bets[msg.sender].value == 0);
        games[gameId].bets[msg.sender] = Pari({
            value: msg.value,
            forLeft: forLeft
            });
        games[gameId].gamblers.push(msg.sender);
    }
    
    function createGame(string left, string right, uint timestamp) public onlyOwner conservatingGasTax {
        games.push(Game({left:left,right:right,timestamp:timestamp,status:GameStatus.Betting,gamblers:new address[](0)}));
    }
    
    function finishBetting(uint32 gameId) public onlyOwner conservatingGasTax {
        require(gameId < games.length);
        require(games[gameId].status == GameStatus.Betting);
        games[gameId].status = GameStatus.Pending;
    }

    function max(uint a, uint b) public pure returns (uint) {
        return a > b ? a : b;
    }

    function min(uint a, uint b) public pure returns (uint) {
        return a < b ? b : a;
    }
    
    function finishGame(uint32 gameId, bool leftWin) public onlyOwner conservatingGasTax {
        require(gameId < games.length);
        require(games[gameId].status == GameStatus.Pending);
        uint i;
        uint value;
        games[gameId].status = leftWin ? GameStatus.LeftWin : GameStatus.RightWin;
        uint sumPrize = 0;
        uint sumWinValues = 0;
        for (i = 0; i < games[gameId].gamblers.length; i++) {
            value = games[gameId].bets[games[gameId].gamblers[i]].value;
            sumPrize += value;
            if (leftWin == games[gameId].bets[games[gameId].gamblers[i]].forLeft) {
                sumWinValues += value;
            }
        }
        uint profit = sumPrize - sumWinValues;
        profit -= min(profit / 2, usedGas);
        uint scale = (sumPrize - profit) * 10**8 * 99 / sumWinValues;
        for (i = 0; i < games[gameId].gamblers.length; i++) {
            if (leftWin == games[gameId].bets[games[gameId].gamblers[i]].forLeft) {
                value = games[gameId].bets[games[gameId].gamblers[i]].value;
                prizes[games[gameId].gamblers[i]] += value * scale / 10**10;
            }
        }
    }
    
    function getPrizes(uint value) public {
        require(value <= prizes[msg.sender]);
        prizes[msg.sender] -= value;
        msg.sender.transfer(value);
    }
    
    function getBalance() public constant returns(uint) {
        return prizes[msg.sender];
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}
