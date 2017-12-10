window.onload = function () {
    path = window.location.href;
    pars = (path.substr( path.indexOf("?")+1 )).split("/");
    console.log(pars);
    alert("check console. :) ");
    //create_headMenu(2);
}