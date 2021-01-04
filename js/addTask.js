//Json of person where can selected
let persons = [{
        name: "Alexander Kummerer",
        mail: "alexander@kummerer.mail",
        img: "img/alex.jpg",
    },
    {
        name: "Eileen Moore",
        mail: "eileen@moore.mail",
        img: "img/eileen.jpg",
    },
    {
        name: "Dan Mercurean",
        mail: "dan@mercurean.mail",
        img: "img/dan.jpg",
    },
    {
        name: "Jaci jack",
        mail: "jaci@jack.maill",
        img: "img/nutzer.svg",
    },
    {
        name: "Junus Ergin",
        mail: "junus@ergin.mail",
        img: "img/junus.jpg",
    },
    {
        name: "Manuel Thaler",
        mail: "manuel@thaler.maill",
        img: "img/manuel.jpg",
    },
];

let selectedUsers = [];
let allTasks = [];

// personBlend with users to select will displayed

function addPersonBlend() {
    document.getElementById("addPersonBlend").classList.remove("d-none");
}

function displayperson() {
    for (let i = 0; i < persons.length; i++) {
        document.getElementById("user-picker-container").innerHTML += `
        <div id="user-picker-row${i}" class ="user-picker-row" onclick="selectUser(${i})"> <img src="${persons[i]["img"]}"> <span>${persons[i]["name"]} </span> </div>
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
        if (selectedUsers[j] == persons[i]) {
            userfound = true;
            document.getElementById(id).classList.remove("user-picker-row-select");
            selectedUsers.splice(j, 1);
        }
    }
    if (!userfound) {
        document.getElementById(id).classList.add("user-picker-row-select");
        selectedUsers.push(persons[i]);
    }
}

function displaySelectedUsers() {
    document.getElementById("assign-person").innerHTML = "";
    for (let j = 0; j < selectedUsers.length; j++) {
        document.getElementById("assign-person").innerHTML += `
        <img id="user" src="${selectedUsers[j]["img"]}">`;
    }
    console.log('selectedUsers');
}

/**
 * This function is used to remove all Selected Persons
 *
 */

function removePerson() {
    selectedUsers = [];

    for (let i = 0; i < persons.length; i++) {
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
    document.getElementById("category").value = "";
    document.getElementById("floatingTextarea2").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("importance").value = "";
    removePerson();
}

/**
 * This function create a new Task with provided Info
 *
 * @param {*} $event
 */

function createTask($event) {
    $event.preventDefault();
    let title = document.getElementById("inputTitle");
    let category = document.getElementById("category");
    let discription = document.getElementById("floatingTextarea2");
    let date = document.getElementById("dateInput");
    let importance = document.getElementById("importance");

    let task = {
        title: title.value,
        category: category.value,
        discription: discription.value,
        date: date.value,
        importance: importance.value,
        assignedPerson: selectedUsers,
    };

    console.log(task);
    taskSubmussion(task);
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