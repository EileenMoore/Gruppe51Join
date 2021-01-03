//Json of person where can selected
let persons = [{
    name: "Alexander Kummerer",
    mail: "alexander@kummerer.mail",
    img: "img/alex.jpg"
},
{
    name: "Eileen Moore",
    mail: "eileen@moore.mail",
    img: "img/eileen.jpg"
},
{
    name: "Dan Mercurean",
    mail: "dan@mercurean.mail",
    img: "img/person-24px.svg"
},
{
    name: "Jaci jack",
    mail: "jaci@jack.maill",
    img: "img/nutzer.svg"
},
{
    name: "Junus Ergin",
    mail: "junus@ergin.mail",
    img: "img/junus.jpg"
},
{
    name: "Manuel Thaler",
    mail: "manuel@thaler.maill",
    img: "img/manuel.jpg"
}];

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
    let userImage = persons[i]["img"];
    let imagefound = false;

    for (let j = 0; j < selectedUsers.length; j++) {
        if (selectedUsers[j] == persons[i].img) {
            imagefound = true;
            document.getElementById(id).classList.remove("user-picker-row-select");
            selectedUsers.splice(j, 1);
        }
    } if (!imagefound) {
        document.getElementById(id).classList.add("user-picker-row-select");
        selectedUsers.push(userImage);
    }
    console.log(selectedUsers);
    displaySelectedUsers();
}

function displaySelectedUsers() {
    document.getElementById("assign-person").innerHTML = '';
    for (let j = 0; j < selectedUsers.length; j++) {
        document.getElementById("assign-person").innerHTML += `
        <img src="${selectedUsers[j]}">`;
    }
}

function removePerson() {
    document.getElementById("assign-person").innerHTML = "";
    if (document.getElementById("assign-person").contains.innerHTML = `
    <img src="${persons[i]["img"]}"> `) {
        document.getElementById("assign-person").remove.innerHTML = `<img src="${persons[i]["img"]}">`;
    }

}

//personBlend will removed



function removePersonBlend() {
    document.getElementById("addPersonBlend").classList.add("d-none");
}

function createTask($event) {
    $event.preventDefault();
}

