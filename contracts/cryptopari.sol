pragma solidity ^0.4.19;

contract CryptoPari {

    modifier moderatable {
        require(msg.sender == admin || moderators[admin] != 0);
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
        uint32 gosuGamersGameId;
        string gosuGamersURL;
        string left;
        string right;
        uint timestamp;
        GameStatus status;
        address[] gamblers;
        mapping (address => Pari) bets;
    }

    Game[] games;
    mapping (address => uint) prizes;
    mapping (address => uint8) moderators;
    address admin;
    uint usedGas;

    function CryptoPari() public {
        admin = msg.sender;
        usedGas = msg.gas * tx.gasprice;
    }

    function addModerator(address newModerator) public moderatable {
        require(msg.sender == admin || moderators[msg.sender] < 3);
        moderators[msg.sender]++;
        moderators[newModerator]++;
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
    
    function createGame(string left, string right, uint timestamp, uint32 gosuGamersId, string gosuGamersURL)
    public moderatable {
        games.push(Game({
            gosuGamersGameId: gosuGamersId,
            gosuGamersURL: gosuGamersURL,
            left: left,
            right: right,
            timestamp: timestamp,
            status: GameStatus.Betting,
            gamblers: new address[](0)
        }));
    }
    
    function finishBetting(uint32 gameId) public moderatable {
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
    
    function finishGame(uint32 gameId, bool leftWin) public moderatable {
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

    function destroy() public {
        require(msg.sender == admin);
        selfdestruct(admin);
    }
}
