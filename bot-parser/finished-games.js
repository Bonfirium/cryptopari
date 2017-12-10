const request = require("request-promise");
const $ = require("cheerio");
const RequestBody = require('./request');


class FinishedGames extends RequestBody {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
        this.games = [];
    }

    async getList() {
        await    this.parseGamesList();
        return this.games;
    }

    async parseGamesList() {
        let upcomingGames = $("table[class='simple matches']", this.body)[1].children[1].children;
        for (let i = 1; i < upcomingGames.length; i += 2) {
            let link = this.parseOnceGame(upcomingGames[i]);
            let gamesInfo = this.parseGameHTML(await super.getHTML(link), link);
            this.games.push(gamesInfo);
        }
    }

    parseOnceGame(game) {
        let linkRelToGame = $("a", game)[0].attribs.href;
        let linkAbsToGame = this.baseUrl + linkRelToGame;
        return linkAbsToGame;
    }

    parseGameHTML(gamePage, link) {
        let command1 = $('div[class="opponent opponent1"]', gamePage)[0];
        let command2 = $('div[class="opponent opponent2"]', gamePage)[0];
        let date = $('p[class="datetime"]', gamePage)[0].children[0].data;
        let score = $('span[class="hidden results btn-2"]', gamePage)[0];

        let command1Img = this.baseUrl + command1.children[1].attribs.style.split('\"')[1];
        let command1Name = command1.children[3].children[0].children[0].data;
        let command2Img = this.baseUrl + command2.children[1].attribs.style.split('\"')[1];
        let command2Name = command2.children[3].children[0].children[0].data;
        let dateUfc = this.dateToUfc(date);
        let scores = this.getScore(score);

        let URLparts = link.split('/');
        let matchID = URLparts[URLparts.length-1].split('-')[0];

        return {
            teams: {
                team1: {
                    img: command1Img,
                    name: command1Name
                }, team2: {
                    img: command2Img,
                    name: command2Name
                }
            },
            score: scores,
            date: dateUfc,
            url: link,
            matchID
        }

    }

    dateToUfc(stringDate) {
        let dateParts = stringDate.match(/^\n\s+(\w+) (\d+), \w+, (\d+):(\d+)/);
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let months = monthNames.indexOf(dateParts[1]);
        let day = dateParts[2];
        let hours = dateParts[3];
        let minutes = dateParts[4];

        let date = new Date(0);
        date.setUTCFullYear(new Date().getFullYear(), +months, +day);
        date.setUTCHours(+hours);
        date.setUTCMinutes(+minutes);

        return date.getTime();
    }

    getScore(scoreHTML) {
        let item1 = scoreHTML.children[1];
        let item2 = scoreHTML.children[3];
        let one = {}, two = {};
        one.type = item1.attribs.class;
        one.score = item1.children[0].data;
        two.type = item2.attribs.class;
        two.score = item2.children[0].data;
        return {
            [one.type]: one.score,
            [two.type]: two.score
        }
    }
}

(async () => {
    try {
        let url = "http://www.gosugamers.net";
        let finishedgGames = new FinishedGames(url);
        await  finishedgGames.setBodyByUrl("http://www.gosugamers.net/dota2/gosubet");
        (await  finishedgGames.getList()).forEach(val => console.log(JSON.stringify(val, null, ' ')));
    }
    catch (e) {
        console.error(e);
    }
})();
