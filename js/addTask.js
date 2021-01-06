let selectedUsers = [];
let allTasks = [];

// personBlend with users to select will displayed

function addPersonBlend() {
    document.getElementById("addPersonBlend").classList.remove("d-none");
}

function displayperson() {
    loadAllUsers();
    for (let i = 0; i < users.length; i++) {
        document.getElementById("user-picker-container").innerHTML += `
        <div id="user-picker-row${i}" class ="user-picker-row" onclick="selectUser(${i})"> <img src="${users[i]["profilePicture"]}"> <span>${users[i]["username"]} </span> </div>
    `;
    }
}

/**
 * This function is used to select an user
 *
 *
 * @param {number} i - defines the row number
 */

function selectUser(i) {
    let id = "user-picker-row" + i;
    checkIfUserIsAlreadySelected(i, id);
    console.log(selectedUsers);
    displaySelectedUsers();
}

/**
 *
 * This function is used to check if an User is Selected
 *
 * @param {number} i - defines the postion of the array persons
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

function displaySelectedUsers() {
    document.getElementById("assign-person").innerHTML = "";
    for (let j = 0; j < selectedUsers.length; j++) {
        document.getElementById("assign-person").innerHTML += `
        <img id="user" src="${selectedUsers[j]["profilePicture"]}">`;
    }
    console.log("selectedUsers");
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
    displaySelectedUsers();
}

//personBlend will removed

function removePersonBlend() {
    document.getElementById("addPersonBlend").classList.add("d-none");
}

function cancelTask() {
    document.getElementById("inputTitle").value = "";

    document.getElementById("floatingTextarea2").value = "";
    document.getElementById("dateInput").value = "";

    removePerson();
}

/**
 * This function create a new Task with provided Info
 *
 * @param {*} $event
 */

function createTask($event) {
    $event.preventDefault();

    defurgency();

    newTask();
    console.log(task);
    taskSubmussion(task);

    alert("New Task is created");
    cancelTask();
}

function newTask() {
    let title = document.getElementById("inputTitle");
    let category = document.getElementById("category");
    let description = document.getElementById("floatingTextarea2");
    let date = document.getElementById("dateInput");
    let importance = document.getElementById("importance");

    task = {
        title: title.value,
        category: category.value,
        description: description.value,
        date: date.value,
        importance: importance.value,
        assignedPeople: selectedUsers,
        urgency: urgency,
        section: resolveSection(importance.value, urgency),
    };
}

/**
 *  push task to allTasks-array, if an user is selected,  push task to allTasks-array
 *
 * @param {object} task - object with information of the task
 *
 */

function taskSubmussion(task) {
    if (selectedUsers < 1) {
        alert("Please select at least one person for the task");
    } else {
        allTasks.push(task);
        let allTasksAsString = JSON.stringify(allTasks);
        localStorage.setItem("allTasks", allTasksAsString);
        console.log(allTasks);
    }
}

/**
 * Load all Task
 *
 */

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem("allTasks");
    allTasks = JSON.parse(allTasksAsString) || [];
}

/**
 * Defines urgency and Section
 *
 *
 *
 */

let dateSelected;
let dayTime = 259200000;

function getDate() {
    dateSelected = new Date(document.getElementById("dateInput").value).getTime();
}

function defurgency() {
    let createdDate = new Date().getTime();
    let Datedifference = dateSelected - createdDate;

    if (Datedifference < dayTime) {
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