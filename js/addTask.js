let selectedUsers = [];
let allTasks = [];
let selectedCategories = [];

/**
 * This function displays the user picker.
 */
function addPersonBlend() {
    document.getElementById("addPersonBlend").classList.remove("d-none");
}

/**
 * This function is used to display all users in the "assigned to" selection.
 */
async function displayUsers() {
    await loadAllUsers();
    loadCurrentUser();
    let loggedInUser = users.find((e) => e.username == currentUser[0].username);
    selectedUsers.push(loggedInUser);
    getUserPicker();
    displaySelectedUsers();
    blendCurrentUser();
}

/**
 * This function is used to generate all users in the user picker.
 */
function getUserPicker() {
    document.getElementById("user-picker-container").innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        document.getElementById("user-picker-container").innerHTML += `
        <div id="user-picker-row${i}" class ="user-picker-row" onclick="selectUser(${i})"> 
        <img src="${users[i]["profilePicture"]}"> 
        <span>${users[i]["username"]} </span> 
        </div>`;
    }
}

/**
 * This function is used to highlight the current user in the user picker.
 */
function blendCurrentUser() {
    for (let j = 0; j < users.length; j++) {
        if (users[j]["username"] == selectedUsers[0]["username"]) {
            document
                .getElementById("user-picker-row" + j)
                .classList.add("user-picker-row-select");
        }
    }
}

/**
 * This function is used to select an user
 *
 *
 * @param {integer} i - defines the row number
 */
function selectUser(i) {
    let id = "user-picker-row" + i;
    checkIfUserIsAlreadySelected(i, id);
    displaySelectedUsers();
}

/**
 *
 * This function is used to check if an User is Selected in the user picker.
 *
 * @param {integer} i - defines the postion of the array persons
 * @param {string} id  - defines the row of the selected user
 *
 */
function checkIfUserIsAlreadySelected(i, id) {
    let userfound = false;
    for (let j = 0; j < selectedUsers.length; j++) {
        if (selectedUsers[j] == users[i]) {
            userfound = true;
            document.getElementById(id).classList.remove("user-picker-row-select");
            selectedUsers.splice(j, 1);
        }
    }
    if (!userfound) {
        document.getElementById(id).classList.add("user-picker-row-select");
        selectedUsers.push(users[i]);
    }
}

/**
 * This function is used to display the selected users in the add tasks section.
 */
function displaySelectedUsers() {
    document.getElementById("assign-person").innerHTML = "";
    for (let j = 0; j < selectedUsers.length; j++) {
        document.getElementById("assign-person").innerHTML += `
        <img id="user" src="${selectedUsers[j]["profilePicture"]}">`;
    }
}

/**
 * This function is used to remove all Selected Persons
 *
 */
function removePerson() {
    selectedUsers = [];

    for (let i = 0; i < users.length; i++) {
        let id = "user-picker-row" + i;
        document.getElementById(id).classList.remove("user-picker-row-select");
    }

    displayUsers();
}

/**
 * This function hides the user picker.
 */
function removePersonBlend() {
    document.getElementById("addPersonBlend").classList.add("d-none");
}

/**
 * This function is used to cancel the task and clear all input fields.
 */
function cancelTask() {
    document.getElementById("inputTitle").value = "";
    document.getElementById("category").value = "";
    document.getElementById("floatingTextarea2").value = "";
    document.getElementById("dateInput").value = "";
    selectedCategories = [];
    removePerson();
}

/**
 * This function creates a new Task with provided Info
 *
 * @param {*} $event
 */
function createTask($event) {
    $event.preventDefault();
    defurgency();
    validateCategories();
    newTask();
    taskSubmission(task);
    alert("New Task is created. You will be redirected to list.");
    location.replace("list.html");
    cancelTask();
}

/**
 * This function generates a new task.
 */
function newTask() {
    let title = document.getElementById("inputTitle");

    let description = document.getElementById("floatingTextarea2");
    let date = document.getElementById("dateInput");
    let importance = document.getElementById("importance");

    task = {
        id: new Date().getTime(),
        title: title.value.replace("<", ""),
        category: selectedCategories,
        description: description.value.replace("<", ""),
        date: date.value,
        importance: importance.value,
        assignedPeople: selectedUsers,
        urgency: urgency,
        section: resolveSection(importance.value, urgency),
    };
}

/**
 * This function pushes the task to allTasks-array if an user is selected.
 *
 * @param {object} task - object with information of the task
 *
 */
function taskSubmission(task) {
    if (selectedUsers < 1) {
        alert("Please select at least one person for the task");
    } else {
        allTasks.push(task);
        backend.setItem("allTasks", JSON.stringify(allTasks));
        console.log(allTasks);
    }
}

async function loadAllTasks() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem("allTasks")) || [];
    updateUrgency();
    updateSection();
}

/**
 *
 *  Defines Urgency and Section after creating a Task
 
 */

let dateSelected;
let dayTime = 259200000;

function getDate() {
    dateSelected = new Date(document.getElementById("dateInput").value).getTime();
}

function defurgency() {
    let createdDate = new Date().getTime();
    let dateDifference = dateSelected - createdDate;

    if (dateDifference < dayTime) {
        urgency = "High";
    } else {
        urgency = "Low";
    }
}

function resolveSection(i, u) {
    if (i == "High" && u == "High") {
        return "do";
    } else if (i == "High" && u == "Low") {
        return "schedule";
    } else if (i == "Low" && u == "High") {
        return "delegate";
    } else if (i == "Low" && u == "Low") {
        return "eliminate";
    } else {
        return "Section unknown";
    }
}

/**
 *
 *
 * Update urgency and Section before onloading on list and Matrix
 *
 */

function updateUrgency() {
    for (let i = 0; i < allTasks.length; i++) {
        let thisDate = new Date().getTime();
        let difference = new Date(allTasks[i].date).getTime() - thisDate;
        if (difference >= dayTime) {
            allTasks[i].urgency = "Low";
        } else {
            allTasks[i].urgency = "High";
        }
    }
}

function updateSection() {
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (task.importance == "High" && task.urgency == "High") {
            allTasks[i].section = "do";
        } else if (task.importance == "High" && task.urgency == "Low") {
            allTasks[i].section = "schedule";
        } else if (task.importance == "Low" && task.urgency == "High") {
            allTasks[i].section = "delegate";
        } else if (task.importance == "Low" && task.urgency == "Low") {
            allTasks[i].section = "eliminate";
        } else {
            allTasks[i].section = "Section unknown";
        }
    }
}

/**
 *  You can pick only future Days
 *
 */

function pickOnlyfutureDays() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("dateInput").setAttribute("min", today);
}

function showAllTasks() {
    console.log(allTasks);
}

/**
 *
 * You can only Choose 3 Categories
 *
 *
 */

function selectOnlyThreeCategories() {
    let opt;
    let selectChoose = document.getElementById("category").options;
    let optionCount = 0;
    let maxOptions = 3;
    for (let i = 0; i < selectChoose.length; i++) {
        opt = selectChoose[i];

        if (opt.selected) {
            optionCount++;
            if (optionCount > maxOptions) {
                alert("You can only Choose 3 Categories");
                document.getElementById("category").value = "";
                selectedCategories = [];
            }
        }
    }
}

/**
 *
 * Selected Categories will add to the Task
 *
 *
 */

function validateCategories() {
    let opt;
    let options = document.getElementById("category").options;
    for (let i = 0; i < options.length; i++) {
        opt = options[i];
        if (opt.selected) {
            selectedCategories.push(opt.value || opt.text);
        }
    }
}