//Json of person where can selected
let persons = [{
        name: "Alexander Kummerer",
        mail: "alexander@kummerer.mail",
        img: "img/alex.jpg ",
    },
    {
        name: "Eileen Moore",
        mail: "eileen@moore.mail",
        img: "img/nutzer.svg ",
    },
    {
        name: "Dan Mercurean",
        mail: "dan@mercurean.mail",
        img: "img/nutzer.svg ",
    },
    {
        name: "Jaci jack",
        mail: "jaci@jack.maill",
        img: "img/nutzer.svg",
    },
    {
        name: "Junus Ergin",
        mail: "junus@ergin.mail",
        img: "img/nutzer.svg ",
    },
    {
        name: "Manuel Thaler",
        mail: "manuel@thaler.maill",
        img: "img/nutzer.svg ",
    },
];

let selectedUsers = [];

// personBlen with users to selct will displayed

function addPersonBlend() {
    document.getElementById("addPersonBlend").classList.remove("d-none");
}

function displayperson() {
    for (let i = 0; i < persons.length; i++) {
        const person = persons[i];
        document.getElementById("user-picker-container").innerHTML += `
        <div id="user-picker-row${i}" class ="user-picker-row" onclick="selectUser(${i})"> <img src="${person["img"]}"> <span>${person["name"]} </span> </div>
    `;
    }
}

function selectUser(i) {
    id = "user-picker-row" + i;
    document.getElementById(id).classList.toggle("user-picker-row-select");
    console.log(persons[i]);
    selectPerson(i);

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

function selectPerson(i) {
    if (
        document.getElementById(id).classList.contains("user-picker-row-select")
    ) {
        document.getElementById(id).classList.add("user-picker-row-select");
        document.getElementById("assign-person").innerHTML += `
        <img src="${persons[i]["img"]}">`;
    } else if (!document.getElementById(id).classList.contains("user-picker-row-select")) {
        document.getElementById(id).classList.remove("user-picker-row-select");
        document.getElementById("assign-person").innerHTML -= `
        <img src="${persons[i]["img"]}">`;
        document.getElementById("assign-person").innerHTML = ""
    }

}