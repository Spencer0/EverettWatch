//Start-up functions run when page is loaded.
//1. Include the HTML snippets:
includeHTML();

//2. Define global vars and function bindings
//Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.
var mode = "loginMode"; //Variable captures current UI mode
var loggedInUser = null;
var POLICE_DATA = {};

//Associative array maps modes to page titles
var modeToTitle = {
    //TO DO: Fill in
};

//Bind bottomBarBtnClick function to all elements of class bottomBarBtn
var dataButton = document.getElementById("mode1");
dataButton.addEventListener("click",bottomBarDataClick);
var modeTwoButton = document.getElementById("mode2")
modeTwoButton.addEventListener("click",bottomBarModeTwoClick);

//Set up police data grab
fetch('https://data.everettwa.gov/resource/f6vp-3svh.json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
    POLICE_DATA = myJson
  });


//Execute function to set start state of app
startUp();

