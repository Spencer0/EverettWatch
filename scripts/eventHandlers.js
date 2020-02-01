//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//


const setHide = (elementSet) => elementSet.map(itemHide);
const itemHide = (element) => element.style.display = "none";
const setBlock = (elementSet) => elementSet.map(itemBlock);
const itemBlock = (element) => element.style.display = "block";
const setClearText = (elementSet) => elementSet.map(itemClearText);
const itemClearText = (element) => element.value = "";
const itemDisable = (element) => element.disabled = true;
const itemFocus = (element) => element.focus();
const toggleEnable = (element) => element.disabled = element.disabled ? false : true; 



  //startUp -- This function sets up the initial state of the app: Login page is
  //visible, bottom bar is invisible, all menu items invisible except feed items,
  //menu bottom disabled, UI mode = login
  function startUp() {
    //Hide all pages except for Login Page, which is the start page.

    // First, hide all padded pages
    setHide([...document.getElementsByClassName("paddedPage")])

    // Then, display login screen 
    itemBlock(document.getElementById("loginModeDiv"))

    // Make sure correct menu button icon is displayed
    itemBlock(document.getElementById("menuBtn"))
    itemHide(document.getElementById("menuBtnAlt"))


    //Clear all text from email and password fields
    setClearText([...document.getElementsByClassName("login-input")])

    //Set top bar text
    itemBlock(document.getElementById("topBarTitleWelcome"))
    itemHide(document.getElementById("topBarTitleData"))

    //Hide the bottom bar initially
    itemHide(document.getElementById("bottomBar"))

    //Hide all menu items except for items of current mode:
    setHide([...document.getElementsByClassName("dataMenuItem")])

    //Disable menu button:
    toggleEnable(document.getElementById("menuBtn"))

    //Set current mode
    mode = "loginMode"

    //set the input focus to the email field
    itemFocus(document.getElementById("emailInput"))


  }

  //document click: When the user clicks anywhere in the doc and the menu is open
  //we need to close it and toggle menu state variable.
  document.addEventListener("click",function(e) {
    if (menuOpen) {
      document.getElementById("menuBtnIcon").classList.remove("fa-times"); 
      //Change hamburger to X when menu open
      document.getElementById("menuBtnIcon").classList.add("fa-bars");
      document.getElementById("sideMenu").style.width = "0px"; //close menu
      menuOpen = false;
    }
  });
 
//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click",function(e) {
  if (!menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-times");
    document.getElementById("sideMenu").style.width = "250px"; //open up menu
    menuOpen = true;
    e.stopPropagation();
  }
});   

var bottomBarModeTwoClick = function(event) {
  if(mode === "dataMode" || mode === "addDataMode"){
    setHide([...document.getElementsByClassName("dataMenuItem")])
    itemBlock(document.getElementById("modeTwoDiv"))
    itemHide(document.getElementById("dataPageDiv"))
    itemHide(document.getElementById("addDataPageDiv"))
    mode = "modeTwoDiv";
  }
}

var bottomBarDataClick = function(){
  if(mode === "modeTwoDiv") {
    setBlock([...document.getElementsByClassName("dataMenuItem")])
    itemHide(document.getElementById("modeTwoDiv"))
    itemBlock(document.getElementById("dataPageDiv"))
    mode = "dataMode"
  }
}

//login -- This function sets the initial app state after login. It is called
//from setTimeout after the button spinner has commenced.bottombar
function login() {
  //Stop spinner
  document.getElementById("loginBtnIcon").classList.remove("fas","fa-spinner","fa-spin");

  //Enable menu button:
  toggleEnable(document.getElementById("menuBtn"))

  //Show bottom bar buttons and highlight feed mode button
  itemBlock(document.getElementById("bottomBar"))
  
  //Change title bar to that of app start page
  itemHide(document.getElementById("topBarTitleWelcome"))
  itemBlock(document.getElementById("topBarTitleData"))
 
  // Make sure correct menu button icon is displayed
  itemBlock(document.getElementById("menuBtn"))
  itemHide(document.getElementById("menuBtnAlt"))
  
  //Show only the menu items for current mode
  setBlock([...document.getElementsByClassName("dataMenuItem")])

  //hide login screen and show feed screen
  itemHide(document.getElementById("loginModeDiv"))
  itemBlock(document.getElementById("dataPageDiv"))


  //Save the current user name to local storage
  console.log("Storing: ", document.getElementById("emailInput").value, " In local storage ")
  window.localStorage.setItem("UserName", document.getElementById("emailInput").value)
  loggedInUser = document.getElementById("emailInput").value
  //Set mode to current mode
  mode = "dataMode"
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "feedMode" and make the necessary UI and state changes.

document.getElementById("loginInterface").onsubmit = function(e) {

  //Start spinner:
  document.getElementById("loginBtnIcon").classList.add("fas","fa-spinner","fa-spin");
  setTimeout(login,1000);
  e.preventDefault(); //Prevents form refresh -- the default behavior
};
  
//logOutBtn click: When the user logs out, we need to reset the app to its start
//state, with the login page visible
document.getElementById("logOutBtn").onclick = function(e) {
  //Restore starting app state
  clearSideMenuSelection();
  document.getElementById("viewBtn").classList.add("menuItemSelected");
  startUp();
};


window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
  modal.style.display = "none";
  }
}


document.getElementById("viewBtn").onclick = function(e) {
  clearSideMenuSelection();
  itemHide(document.getElementById("addDataPageDiv"))
  itemBlock(document.getElementById("dataPageDiv"))
  document.getElementById("viewBtn").classList.add("menuItemSelected");
  itemBlock(document.getElementById("bottomBar"))
  itemBlock(document.getElementById("menuBtn"))
  itemHide(document.getElementById("menuBtnAlt"))
  mode = "dataMode"
};



document.getElementById("aboutBtn").onclick = function(e) {
  //Restore starting app state
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  itemHide(document.getElementById("aboutModalInfo"))
  itemBlock(document.getElementById("storageModalInfo"))

};

document.getElementById("menuBtnAlt").onclick = function(e) {
  clearSideMenuSelection();
  itemHide(document.getElementById("addDataPageDiv"))
  itemBlock(document.getElementById("dataPageDiv"))
  document.getElementById("viewBtn").classList.add("menuItemSelected");
  itemBlock(document.getElementById("bottomBar"))
  itemBlock(document.getElementById("menuBtn"))
  itemHide(document.getElementById("menuBtnAlt"))
  mode = "dataMode"

};

document.getElementById("modalClose").onclick = function(e) {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

document.getElementById("addBtn").onclick = dataAddButtonClick;

function dataAddButtonClick(){
  clearSideMenuSelection();
  itemBlock(document.getElementById("addDataPageDiv"))
  itemHide(document.getElementById("dataPageDiv"))
  document.getElementById("addBtn").classList.add("menuItemSelected");
  itemHide(document.getElementById("bottomBar"))
  itemHide(document.getElementById("menuBtn"))
  itemBlock(document.getElementById("menuBtnAlt"))
  mode = "addDataMode";

}

function dataInputFormSubmission(){
  console.log("Submitting!")

  //Here we need to store the info into local storage
  window.localStorage.setItem(loggedInUser, JSON.stringify(buildInputObject()))

  //After, pop up a modal with the current local storage info (append to modal)
  console.log(window.localStorage.getItem(loggedInUser))
  itemHide(document.getElementById("aboutModalInfo"))
  itemBlock(document.getElementById("storageModalInfo"))
  var storageInfo = window.localStorage.getItem(loggedInUser)
  console.log("Used name", loggedInUser, " to get info ", storageInfo)
  document.getElementById("storageModalInfoText").innerHTML = ""
  document.getElementById("storageModalInfoText").append(storageInfo)
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  itemHide(document.getElementById("menuBtnAlt"))
  itemBlock(document.getElementById("menuBtn"))
  clearSideMenuSelection();
  itemHide(document.getElementById("addDataPageDiv"))
  itemBlock(document.getElementById("dataPageDiv"))
  document.getElementById("viewBtn").classList.add("menuItemSelected");
  mode = "dataMode"
}

function buildInputObject(){
  var userSelection = {
    name: "",
    age: 0,
    height: 0,
    gender: ""
  }

  userSelection.name = document.getElementById("name").value;
  userSelection.age = document.getElementById("age").value;
  userSelection.height = document.getElementById("height").value;
  userSelection.gender = document.getElementById("gender").value;
  console.log("Created user input object", userSelection)
  return userSelection;
}

const clearSideMenuSelection = () => [...document.getElementsByClassName("menuItem")].map(resetSideMenuElementStyle)
const resetSideMenuElementStyle = (element) => element.classList.remove("menuItemSelected")