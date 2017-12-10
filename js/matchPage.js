window.onload = function () {
    path = window.location.href;
    pars = (path.substr( path.indexOf("?")+1 )).split("/");
    console.log(pars);


  //  create_headMenu(2);

    var timeText = document.getElementById('match_time'),
    	team1NameText = document.getElementById('team1_name'),
    	team2NameText = document.getElementById('team2_name'),
    	bet1Text = document.getElementById('bet1'),
    	bet2Text = document.getElementById('bet2'),
    	team1Img = document.getElementById('team1_img'),
    	team2Img = document.getElementById('team2_img');
    	
    var data = {
    "now": [{
        "left": {
            "name": "OpTic",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20170927-593x400-7701980052.png",
            "coef": 1.12
        },
        "right": {
            "name": "PENTA",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20170201-400x400-2286973008.png",
            "coef": 5.31
        },
        "score": 0.72,        
        "date": "27.9.2017 9:32"
    }, {
        "left": {
            "name": "Empire",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20161110-300x300-984796327.png",
            "coef": 1.21
        },
        "right": {
            "name": "WGU",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20160920-350x350-6112770522.png",
            "coef": 3.92
        },
        "score": 0.23,
        "date": "27.9.2017 9:32"
    }],
    "future": [{
        "left": {
            "name": "OG",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20170730-965x1361-2318814024.png",
            "coef": 1.5
        },
        "right": {
            "name": "Na'Vi",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20161027-600x514-9668605290.png",
            "coef": 2.41
        },
        "score": 0.5,
        "date": "27.9.2017 9:32"
    }, {
        "left": {
            "name": "Virtus.Pro",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20161110-600x600-7320131375.png",
            "coef": 1.36
        },
        "right": {
            "name": "TnC",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20170219-300x300-7831261665.png",
            "coef": 2.89
        },
        "score": 0.5,
        "date": "27.9.2017 9:32"
    }],
    "past": [{
        "left": {
            "name": "EHOME",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20161115-300x300-42408732.png",
            "coef": 2.65
        },
        "right": {
            "name": "LGD.cn",
            "logo": "http://game-tournaments.com/media/logo/_60/pic-20170219-300x300-7831261665.png",
            "coef": 1.59
        },
        "score": 0.65,
        "date": "27.9.2017 9:32"
    }]
};

var match = data[pars[0]][pars[1]];
console.log(data['now'][0]['date'])
    timeText.textContent = match['date'];
    team1NameText.textContent = match['left']['name'];
    team2NameText.textContent = match['right']['name'];
    bet1Text.textContent = match['left']['coef'];
    bet2Text.textContent = match['right']['coef'];
    if (match['left']['logo']) {
    	team1Img.src = match['left']['logo'];
    } else {
    	team1Img.src = "https://seeklogo.com/images/D/dota-2-logo-556BDCC022-seeklogo.com.png";
    }

    if (match['right']['logo']) {
    	team2Img.src = match['right']['logo'];
    } else {
    	team2Img.src = "https://seeklogo.com/images/D/dota-2-logo-556BDCC022-seeklogo.com.png";
    }
    

}
