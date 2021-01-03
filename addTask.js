//Json of person where can selected
let persons = [{
<<<<<<< HEAD
    'name': "Alexander Kummerer",
    'mail': "alexander@kummerer.mail",
    'img': "img/alex.jpg"
},
{
    'name': "Eileen Moore",
    'mail': "eileen@moore.mail",
    'img': "img/eileen.jpg"
},
{
    'name': "Dan Mercurean",
    'mail': "dan@mercurean.mail",
    'img': "img/person-24px.svg"
},
{
    'name': "Jaci jack",
    'mail': "jaci@jack.maill",
    'img': "img/nutzer.svg"
},
{
    'name': "Junus Ergin",
    'mail': "junus@ergin.mail",
    'img': "img/junus.jpg"
},
{
    'name': "Manuel Thaler",
    'mail': "manuel@thaler.maill",
    'img': "img/manuel.jpg"
}];
=======
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
        img: "img/person-24px.svg",
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
>>>>>>> aa4202b43412b9fa975252d29f5682996922785e

let selectedUsers = [];

// personBlen with users to selct will displayed

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

function selectUser(i) {
    let id = "user-picker-row" + i;
<<<<<<< HEAD
    let user = {
        'username': persons[i]["name"],
        'userImage': persons[i]["img"]
    }

    checkIfUserIsAlreadySelected(i, id, user);
    console.log(selectedUsers);
    displaySelectedUsers();
}
=======
    let userImage = persons[i];
    let imagefound = false;
>>>>>>> aa4202b43412b9fa975252d29f5682996922785e

function checkIfUserIsAlreadySelected(i, id, user){
    let userfound  = false;
    for (let j = 0; j < selectedUsers.length; j++) {
<<<<<<< HEAD
        if (selectedUsers[j].username == persons[i].name) {
            userfound = true;
            document.getElementById(id).classList.remove("user-picker-row-select");
            selectedUsers.splice(j, 1);
        }
    } if (!userfound) {
=======
        if (selectedUsers[j]["img"] == persons[i]["img"]) {
            imagefound = true;
            document.getElementById(id).classList.remove("user-picker-row-select");
            selectedUsers.splice(j, 1);
        }
    }
    if (!imagefound) {
>>>>>>> aa4202b43412b9fa975252d29f5682996922785e
        document.getElementById(id).classList.add("user-picker-row-select");
        selectedUsers.push(user);
    }
}

function displaySelectedUsers() {
    document.getElementById("assign-person").innerHTML = "";
    for (let j = 0; j < selectedUsers.length; j++) {
        document.getElementById("assign-person").innerHTML += `
<<<<<<< HEAD
        <img src="${selectedUsers[j]['userImage']}">`;
=======
        <img src="${selectedUsers[j]["img"]}">`;
>>>>>>> aa4202b43412b9fa975252d29f5682996922785e
    }
}

function removePerson() {
<<<<<<< HEAD
    selectedUsers = [];

    for (let i = 0; i < persons.length; i++) {
        let id = "user-picker-row" + i;
        document.getElementById(id).classList.remove("user-picker-row-select");
    }
    displaySelectedUsers();
=======
    document.getElementById("assign-person").innerHTML = "";
    selectedUsers = [];
>>>>>>> aa4202b43412b9fa975252d29f5682996922785e
}

//personBlend will removed

function removePersonBlend() {
    document.getElementById("addPersonBlend").classList.add("d-none");
}

function createTask($event) {
    $event.preventDefault();
}