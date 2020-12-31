let users = [
    ["Alexander Kummerer", "alexander@kummerer.mail", "img/person-24px.svg"],
    ["Dan Mercurean", "dan@mercurean.mail", "img/person-24px.svg"],
    ["Eileen Moore", "eileen@moore.mail", "img/person-24px.svg"],
    ["Jaci jack", "jaci@jack.mail", "img/person-24px.svg"],
    ["Junus Ergin", "junus@Ergin.mail", "img/person-24px.svg"],
    ["Manuel Thaler", "manuel@thaler.mail", "img/person-24px.svg"],
];

function addPerson() {
    document.getElementById("addPersonBlend").classList.remove("d-none");
}

function removePersonBlend() {
    document.getElementById("addPersonBlend").classList.add("d-none");
}

function createTask($event) {
    $event.preventDefault();

}