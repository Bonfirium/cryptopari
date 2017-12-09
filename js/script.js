"use strict";
function createPage() {
    create_headMenu(1);

}
function create_headMenu( activeIndex = -1) {
    var navItems = [
        {href: 'http://google.com', text: 'Google'},
        {href: 'http://bing.com', text: 'Bing'},
        {href: 'http://stackoverflow.com', text: 'StackOverflow'}
    ];
    // A few variables for use later
    var navElem = document.createElement("nav"),
        navList = document.createElement("ul"), 
        navItem, navLink;
    navElem.className = "head-menu";
    navElem.appendChild(navList);

    // Cycle over each nav item
    for (var i = 0; i < navItems.length; i++) {
        // Create a fresh list item, and anchor
        navItem = document.createElement("li");
        navLink = document.createElement("a");

        // Set properties on anchor
        navLink.href = navItems[i].href;
        navLink.innerHTML = navItems[i].text;
        //navLink.className = "head-menu"

        // Add anchor to list item, and list item to list
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    }

    if ( activeIndex > -1 ) {
        navList.children[0].className = "active";
        alert();
    }
    // Set first list item as current


    // Add list to body (or anywhere else)
    // window.onload = function () {
    document.body.appendChild(navElem);
    // }
    
}
