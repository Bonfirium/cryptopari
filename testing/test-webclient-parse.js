const request = require("request-promise");
const $ = require("cheerio");
const fs = require('fs');

function upcomingGamems() {

    return {
        async getUpcomingGamesList(body) {

            let gamesInfoList = [];
            let upcomingGames = $('div[class="match-event event without-score is-not-live"]', body);
            for (let i = 0; i < upcomingGames.length; i++) {
                gamesInfoList.push(await
                    this.getGameInfo(upcomingGames[i])
                )
            }
            return gamesInfoList;
        },

        async getGameInfo(game) {

            let commandsHTML = $('div[class="event-teams"]', game);
            let dateHTML = $('div[class="event-date"]', game);
            let iventHTML = $('div[class="event-tournament-info"]', game);
            let tournamentInfo = iventHTML[0].children[1].attribs.title;
            let teams = await this.getTeamsInfo(commandsHTML);
            let gameTime = await this.getGameTime(dateHTML);
            return {
                tournamentInfo,
                ...teams,
                date: gameTime
            }
        },

        async getTeamsInfo(commandsHTML) {
            let teams = $('a', commandsHTML);
            let teamHome = teams[0].children;
            let teamAway = teams[1].children;
            return {
                away: {
                    name: teamHome[2].data,
                    img: teamHome[1].attribs.src
                },
                home: {
                    name: teamAway[2].data,
                    img: teamAway[1].attribs.src
                }
            }
        },

        async getGameTime(dateHTML) {
            let time = $('div[class="event_date_hour_minutes"]', dateHTML);
            let date = $('div[class="event_date_day_month"]', dateHTML);
            let timeValue = time[0].children[0].data;
            let dateValue = date[0].children[0].data;
            return {
                dateTime: {
                    date: dateValue,
                    time: timeValue
                }
            }
//
        }
    }

}

function finishedGames() {

    return {
        async getFinishedGames(body) {
            let gamesInfoList = [];
            let upcomingGames = $('div[class="match-event event with-score is-not-live"]', body);
            for (let i = 0; i < upcomingGames.length; i++) {
                gamesInfoList.push(await
                    this.getGameInfo(upcomingGames[i])
                )
            }
            return gamesInfoList;
        },
        async getGameInfo(game) {

            let commandsHTML = $('div[class="event-teams"]', game);
            let dateHTML = $('div[class="event-date"]', game);
            let scoreHTML = $('div[class="event-main-scores"]', game);
            let iventHTML = $('div[class="event-tournament-info"]', game);
            let tournamentInfo = iventHTML[0].children[1].attribs.title;
            let teams = await this.getTeamsInfo(commandsHTML);
            let gameTime = await this.getGameTime(dateHTML);
            let score = await this.getscoreInfo(scoreHTML);
            return {
                tournamentInfo,
                teams,
                ...score,
                date: gameTime
            }
        },
        async getTeamsInfo(commandsHTML) {
            let teams = $('a', commandsHTML);
            let teamHome = teams[0].children;
            let teamAway = teams[1].children;
            return {
                away: {
                    name: teamHome[2].data,
                    img: teamHome[1].attribs.src
                },
                home: {
                    name: teamAway[2].data,
                    img: teamAway[1].attribs.src
                }
            }
        },
        async getscoreInfo(scoreHTMLs) {
            let home = $('span[class="home-runningscore"]', scoreHTMLs)[0].children[0].data;
            let away = $('span[class="away-runningscore"]', scoreHTMLs)[0].children[0].data;
            return {
                score: {
                    home,
                    away
                }
            }
        },
        async getGameTime(dateHTML) {
            let time = $('div[class="event_date_hour_minutes"]', dateHTML);
            let date = $('div[class="event_date_day_month"]', dateHTML);
            let timeValue = time[0].children[0].data;
            let dateValue = date[0].children[0].data;
            return {
                dateTime: {
                    date: dateValue,
                    time: timeValue
                }
            }
        }
    }
}

function getUrlByDayOffset(dayOffset = 0) {
    let offsetTick = dayOffset * 24 * 60 * 60 * 1000;
    let today = new Date(Date.now() + offsetTick);
    let dd = normalizeDatePart(today.getDate());
    let mm = normalizeDatePart(today.getMonth() + 1); //January is 0!
    let yyyy = today.getFullYear();

    return `http://esportlivescore.com/l_ru_d_${yyyy}-${mm}-${dd}_g_dota.html`;
}

function normalizeDatePart(part) {
    return part + 1 < 10 ? '0' + part : part;
}

async function getHtml(url) {
    return await request(url);
};


(async function () {
    let url = getUrlByDayOffset(0);                        //param 0 -> today
    let body = await getHtml(url);

    let upcomingGamesList = await upcomingGamems().getUpcomingGamesList(body);
    let finishedGamesList = await finishedGames().getFinishedGames(body);

    await fs.writeFile('./content/upG.json', JSON.stringify(upcomingGamesList), null, '\t\n');
    await  fs.writeFile('./content/finG.json', JSON.stringify(finishedGamesList), null, '\t\n');
})();

