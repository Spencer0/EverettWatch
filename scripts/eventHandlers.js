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
const POLICE_MAN = "👮";
var dataTableInitalized = false;
var communityDataInitalized = false;



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
    initDataTable()
    itemHide(document.getElementById("homepage"))
    mode = "modeTwoDiv";
  }
}

var bottomBarDataClick = function(event){
  if(mode === "modeTwoDiv" || mode === "dataMode") {
    setBlock([...document.getElementsByClassName("dataMenuItem")])
    itemHide(document.getElementById("modeTwoDiv"))
    itemBlock(document.getElementById("dataPageDiv"))
    itemHide(document.getElementById("homepage"))
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
  itemBlock(document.getElementById("homepage"))
  var id_slot = document.getElementById("userID")
  id_slot.append(window.localStorage.getItem("userID"))

  //Save the current user name to local storage
  console.log("Storing: ", document.getElementById("emailInput").value, " In local storage ")
  window.localStorage.setItem("UserName", document.getElementById("emailInput").value)

  var id_slot = document.getElementById("userID")
  id_slot.innerHTML = window.localStorage.getItem("UserName")

  loggedInUser = document.getElementById("emailInput").value

  establishLogoClickEvent()
  showDefaultTableStructures()
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
  document.getElementById("LisasCoolLogo").onclick = ""
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
  document.getElementById("storageModalInfoText").innerHTML = "Developed by: Spencer, Lisa, Martin, and Juan"

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

function establishLogoClickEvent(){
  document.getElementById("LisasCoolLogo").onclick = function(e) {
    clearSideMenuSelection();
    itemHide(document.getElementById("addDataPageDiv"))
    itemHide(document.getElementById("modeTwoDiv"))
    itemHide(document.getElementById("dataPageDiv"))
    itemBlock(document.getElementById("bottomBar"))
    itemBlock(document.getElementById("menuBtn"))
    itemHide(document.getElementById("menuBtnAlt"))
    itemBlock(document.getElementById("homepage"))
    mode = "dataMode"
  
  };
}

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
  var storageInfo = window.localStorage.getItem(loggedInUser)
  console.log("Used name", loggedInUser, " to get info ", storageInfo)
  document.getElementById("storageModalInfoText").innerHTML = "Thank you for submitting!"
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
    suspectdescription: "",
    datereceived: "",
    title: "",
    incidenttype: "",
    location: "",
    description: ""
  }

  // Find a <table> element with id="myTable":
  var table = document.getElementById("datatable");

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  var cell6 = row.insertCell(6);

  userSelection.name = document.getElementById("emailInput").value;
  userSelection.suspectdescription = document.getElementById("suspectdescription").value;
  userSelection.datereceived = document.getElementById("datereceived").value;
  userSelection.title = document.getElementById("title").value;
  userSelection.incidenttype = document.getElementById("incidenttype").value;
  userSelection.location = document.getElementById("location").value;
  userSelection.description = document.getElementById("description").value;
  console.log("Created user input object", userSelection)

  // Add some text to the new cells:
  cell0.innerHTML = userSelection.name;
  cell1.innerHTML = userSelection.suspectdescription;
  cell2.innerHTML = userSelection.datereceived;
  cell3.innerHTML = userSelection.title;
  cell4.innerHTML = userSelection.incidenttype;
  cell5.innerHTML = userSelection.location;
  cell6.innerHTML = userSelection.description;

  return userSelection;
}



function showDefaultTableStructures(){
  if (communityDataInitalized) {
    return;
  }
  // Find a <table> element with id="myTable":
  var table = document.getElementById("datatable");

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  var cell5 = row.insertCell(5);
  var cell6 = row.insertCell(6);
  cell0.innerHTML = "Sue May";
  cell1.innerHTML = "Tall male"
  cell2.innerHTML = "1/12/2020";
  cell3.innerHTML = "HELP!";
  cell4.innerHTML = "Theft";
  cell5.innerHTML = "Hewitt Ave";
  cell6.innerHTML = "A short but sweet description!";

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row2 = table.insertRow(1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell0 = row2.insertCell(0);
  var cell1 = row2.insertCell(1);
  var cell2 = row2.insertCell(2);
  var cell3 = row2.insertCell(3);
  var cell4 = row2.insertCell(4);
  var cell5 = row2.insertCell(5);
  var cell6 = row2.insertCell(6);
  cell0.innerHTML = "Jack White";
  cell1.innerHTML = "Devilishly handsome Asian male"
  cell2.innerHTML = "2/2/2020";
  cell3.innerHTML = "Who is this man?";
  cell4.innerHTML = "Suspicious Event";
  cell5.innerHTML = "WSU";
  cell6.innerHTML = "There's a man on the prowl! Heard him referred to as Bolong Zeng.";
  communityDataInitalized = true
}

const clearSideMenuSelection = () => [...document.getElementsByClassName("menuItem")].map(resetSideMenuElementStyle)
const resetSideMenuElementStyle = (element) => element.classList.remove("menuItemSelected")


function flattenPoliceDataArray(){
  outside = []

  function myIteratorFunction(item, index) {
    thisData = [item.datetimereceived, item.incidenttype, item.eventaddressby100block, item.precinct, item.eventnumber]
    outside.push(thisData)
  } 

  POLICE_DATA.forEach(myIteratorFunction)
  
  console.log("outside" , outside)

  return outside
}
function initDataTable(){
  if(dataTableInitalized){
    return;
  }
  dataTableInitalized = true
  console.log(POLICE_DATA)
  $('#table_id').DataTable( {
      data: flattenPoliceDataArray(),
      columns: [
        { title: "Timestamp" },
        { title: "Type" },
        { title: "Location" },
        { title: "Precinct" },
        { title: "event #" }

    ]
  } );
}