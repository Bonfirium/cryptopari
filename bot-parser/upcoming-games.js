const $ = require("cheerio");
const RequestBody = require('./request');

class UpcomingGames extends RequestBody {
    constructor() {
        super();
        this.baseUrl = "http://www.gosugamers.net";
        this.games = [];
    }

    async getList() {
        await    this.parseGamesList();
        return this.games;
    }

    async parseGamesList() {
        let upcomingGames = $("table[class='simple matches']", this.body)[0].children[1].children;
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
        let date = $('p[class="datetime is-upcomming"]', gamePage)[0].children[0].data;


        let command1Img = this.baseUrl + command1.children[1].attribs.style.split('\"')[1];
        let command1Name = command1.children[3].children[0].children[0].data;
        let command2Img = this.baseUrl + command2.children[1].attribs.style.split('\"')[1];
        let command2Name = command2.children[3].children[0].children[0].data;
        let dateUfc = this.dateToUfc(date);

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
}

module.exports = UpcomingGames;

// (async () => {
//     try {
//         let upcomingGames = new UpcomingGames();
//         await  upcomingGames.setBodyByUrl();
//         (await  upcomingGames.getList()).forEach(val => console.log(JSON.stringify(val, null, ' ')));
//
//
//     }
//     catch (e) {
//         console.error(e);
//     }
// })();
