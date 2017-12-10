const request = require("request-promise");
const $ = require("cheerio");
const RequestBody = require('./request');

class UpcomingGames extends RequestBody {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
        this.gamesLinks = [];
        this.games = [];

    }

    getList() {
        this.parseGamesList();
        return this.list;
    }

    parseGamesList() {
        let upcomingGames = $("table[class='simple matches']", this.body)[1].children[1].children;
        for (let i = 1; i < upcomingGames.length; i += 2)
            this.parseOnceGame(upcomingGames[i]);

    }

    parseOnceGame(game) {
        let linkRelToGame = $("a", game)[0].attribs.href;
        let linkAbsToGame = this.baseUrl+linkRelToGame;
        this.gamesLinks.push(linkAbsToGame);
    }

}


(async () => {
    try {
        let upcomingGames = new UpcomingGames("http://www.gosugamers.net");
        await  upcomingGames.setBodyByUrl("http://www.gosugamers.net/dota2/gosubet");
        upcomingGames.getList();


    }
    catch (e) {
        console.error(e);
    }
})();
