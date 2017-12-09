function create_headMenu( activeIndex = -1 ) {
    var navItems = [
        {href: "./main.html", text: "Main Page"},
        {href: "./matches.html", text: "Matches"}
    ];
    var navElem  = document.createElement("nav"),
        navList  = document.createElement("ul"), 
        navLogo  = document.createElement("img"),
        navItem  = document.createElement("li"),
        navStyle = document.createElement("link"),
        navLink;

    // add style
    navStyle.rel = "stylesheet";
    navStyle.href = "css/headMenu.css";
    navStyle.type = "text/css";
    document.head.appendChild(navStyle);

    // add class
    navElem.className = "head-menu";

    // add logo
    navLogo.className = "brand";
    navLogo.src = ".\\images\\headMenuLogo.png";
    navItem.appendChild(navLogo);
    navList.appendChild(navItem);

    navElem.appendChild(navList);

    for (var i = 0; i < navItems.length; i++) {
        navItem = document.createElement("li");
        navLink = document.createElement("a");
        navLink.href = navItems[i].href;
        navLink.innerHTML = navItems[i].text;
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    }

    if ( activeIndex > -1 )
        navList.children[ activeIndex + 1 ].className = "active";

    document.body.appendChild(navElem);
}