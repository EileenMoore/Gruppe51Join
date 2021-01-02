//Json of person where can selected
let persons = [{
        name: "Alexander Kummerer",
        mail: "alexander@kummerer.mail",
        img: "img/nutzer.svg",
    },
    {
        name: "Eileen Moore",
        mail: "eileen@moore.mail",
        img: "img/nutzer.svg",
    },
    {
        name: "Dan Mercurean",
        mail: "dan@mercurean.mail",
        img: "img/nutzer.svg",
    },
    {
        name: "Jaci jack",
        mail: "jaci@jack.maill",
        img: "img/nutzer.svg",
    },
    {
        name: "Junus Ergin",
        mail: "junus@ergin.mail",
        img: "img/nutzer.svg",
    },
    {
        name: "Manuel Thaler",
        mail: "manuel@thaler.maill",
        img: "img/nutzer.svg",
    },
];

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

function selectUser(person) {
    document.getElementById("user-picker-row{i}").classList.toggle("user-picker-row-select");

}


//personBlend will removed

function removePersonBlend() {
    document.getElementById("addPersonBlend").classList.add("d-none");
}

function createTask($event) {
    $event.preventDefault();
}