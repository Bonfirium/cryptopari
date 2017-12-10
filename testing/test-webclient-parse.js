const request = require("request-promise");
const URL_GAME_TOURNAMENTS = "https://game-tournaments.com/dota-2";
const $ = require("cheerio");


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

async function getupcomingGamesList(body) {

    let gamesInfoList = [];
    let upcomingGames = $('div[class="match-event event without-score is-not-live"]', body);
    for(let i=0; i<upcomingGames.length;i++){
        gamesInfoList.push(await getGameInfo(upcomingGames[i]))
    }
    gamesInfoList.forEach(val=>{
        console.log(val);
    })

    //   console.log(gamesList);
}

async function getGameInfo(game) {

    let commandsHTML = $('div[class="event-teams"]', game);
    let dateHTML = $('div[class="event-date"]', game);
    let teams = await getTeamsInfo(commandsHTML);
    let gameTime = await getGameTime(dateHTML);
    return {
        ...teams,
        date: gameTime
    }
}

async function getTeamsInfo(commandsHTML) {
    let teams = $('a', commandsHTML);
    let teamHome = teams[0].children;
    let teamAway = teams[1].children;
    return {
        teams: [
            {
                name: teamHome[2].data,
                img: teamHome[1].attribs.src
            },
            {
                name: teamAway[2].data,
                img: teamAway[1].attribs.src
            }
        ]
    }
    //   console.log(gamesList);
}

async function getGameTime(dateHTML) {
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

(async function () {
    let url = getUrlByDayOffset(0);                        //param 0 -> today

    let body = await getHtml(url);
   let  await getupcomingGamesList(body);
})();

