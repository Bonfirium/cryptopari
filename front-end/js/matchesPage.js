window.onload = function () {
    create_headMenu(1);
    data = getData();
    table = document.createElement("table");
    table.className = "matchesList";
    for ( let time in data) {
        row = document.createElement("tr");
        
        title = document.createElement("th");
        title.innerText = time;
        title.colSpan = "3";

        row.appendChild(title);
        table.appendChild(row);

        for ( i = 0; i < data[time].length; i++ ) {

            row = document.createElement("tr");
            a = document.createElement("a")
            left = document.createElement("td");
            middle = document.createElement("td");
            right = document.createElement("td");

            row.className = "line";
            row.onmouseover = highlight.bind( null, left, middle, right );
            row.onmouseout  = highlight_off.bind(null, left, middle, right );

            left.className = "left";
            middle.className = "middle";
            right.className = "right";

            a.href = "./match.html?" + time + "/" + i;

            leftIcon = document.createElement("img");
            leftIcon.src = data[time][i]["left"]["logo"];
            leftIcon.width = leftIcon.height = 32;
            leftTeam = document.createElement("text");
            leftTeam.innerText = data[time][i]["left"]["name"];

            if ( i == 0 ) {
                vsIcon = document.createElement("img");
                vsIcon.className = "vsIcon";
                vsIcon.src = "./images/vs.png";
                middle.appendChild(vsIcon);
            }

            rightIcon = document.createElement("img");
            rightIcon.src = data[time][i]["right"]["logo"];
            rightIcon.width = rightIcon.height = 32;
            rightTeam = document.createElement("text");
            rightTeam.innerText = data[time][i]["right"]["name"];

            left.appendChild(leftTeam);
            left.appendChild(leftIcon);
            //middle.appendChild(vsIcon);
            right.appendChild(rightIcon);
            right.appendChild(rightTeam);
            a.appendChild(left);
            a.appendChild(middle);
            a.appendChild(right);
            row.appendChild(a);
            
            // row.appendChild( leftTeam );
            // row.appendChild( leftIcon );
            // row.appendChild( vsIcon );
            // row.appendChild( rightIcon );
            // row.appendChild( rightTeam );
    
            // row.appendChild( leftIcon );
            // row.appendChild( leftTeam );
            // row.appendChild( vsIcon );
            // row.appendChild( rightTeam );
            // row.appendChild( rightIcon );
            //row1.appendChild(row);
            table.appendChild( row );
        }
        row = document.createElement("div");
        row.className = "emptyDiv";
        table.appendChild(row);

    }
    document.body.appendChild(table);
    
}
function highlight( d1, d2, d3 ) {
    d1.style.backgroundImage = 'url(".//images//leftRed.jpg")';
    d2.style.backgroundColor = "#760101";
    d3.style.backgroundImage = 'url(".//images//rightRed.jpg")';

}
function highlight_off( d1, d2, d3 ) {
    d1.style.backgroundImage = 'url(".//images//left.jpg")';
    d2.style.backgroundColor = "rgb(97, 97, 97)";
    d3.style.backgroundImage = 'url(".//images//right.jpg")';

}
function getData() {
    data = {
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
            "score": 0.72
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
            "score": 0.23
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
            "score": 0.5
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
            "score": 0.5
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
            "score": 0.65
        }]
    };
    return data;
}
