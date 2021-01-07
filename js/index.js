let users = [{
    username: "Alexander Kummerer",
    email: "alexander@kummerer.mail",
    password: "passwort",
    profilePicture: "img/profileimg/alex.jpg",
},
{
    username: "Eileen Moore",
    email: "eileen@moore.mail",
    password: "passwort",
    profilePicture: "img/profileimg/eileen.jpg",
},
{
    username: "Dan Mercurean",
    email: "dan@mercurean.mail",
    password: "passwort",
    profilePicture: "img/profileimg/dan.jpg",
},
{
    username: "Jaci jack",
    email: "jaci@jack.mail",
    password: "passwort",
    profilePicture: "img/profileimg/nutzer.svg",
},
{
    username: "Junus Ergin",
    email: "junus@ergin.mail",
    password: "passwort",
    profilePicture: "img/profileimg/junus.jpg",
},
{
    username: "Manuel Thaler",
    email: "manuel@thaler.maill",
    password: "passwort",
    profilePicture: "img/profileimg/manuel.jpg",
},
];

let currentUser = [];
let profilePictureAsDataURL = [];
let currentProfilePicture = [];
let currentEmail = [];

/**
 * This function is used to sign up a new user for JOIN.
 */
function signUp() {
    getProfilePicture();
    saveUsersInLocalStorage();
    closeRegistration();
    alert("Your Sign Up was successful");
    let i = users.length - 1;
    let currentUsername = users[i].username;
    let currentPassword = users[i].password;
    loginCurrentUser(currentUsername, currentPassword, i);
}

/**
 * This function is used to set up a profile picture.
 */
function getProfilePicture() {
    let picture = profilePictureAsDataURL;
    if (profilePictureAsDataURL.length == 0) {
        picture = "img/profileimg/nutzer.svg";
    }
    addUser(picture);
}

/**
 * This function is used to add a new user to the users of JOIN.
 * 
 * 
 * @param {string} picture - This is the profile picture of the new user.
 */
function addUser(picture) {
    let user = generateUser(picture);
    users.push(user);
}

/**
 * This function generates the user data for a new user.
 *
 *
 * @param {string} picture - This is the profile picture of the user.
 */
function generateUser(picture) {
    return {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        profilePicture: picture,
    };
}

/**
 * This function saves the user data (username, password, email, profile-picture) of alle users in the local storage.
 */
function saveUsersInLocalStorage() {
    let allUsersAsString = JSON.stringify(users);
    localStorage.setItem("users", allUsersAsString);
}

/**
 * This function is used to login the user into the JOIN website by getting the username and password of the user.
 */
function login() {
    let currentUsername = document.getElementById("currentUsername").value;
    let currentPassword = document.getElementById("currentPassword").value;
    let userfound = false;
    checkIfLoginIsCorrect(userfound, currentUsername, currentPassword);
}

/**
 * This function checks if the entered login data matches with the data of the signed up users. If the data is correct the user is located
 * to the matrix and saved as the current user in the local storage. If the data is incorrect the user gets an alert.
 *
 *
 * @param {boolean} userfound - This value expresses if the login data is correct.
 * @param {string} currentUsername - This is the username that the user entered in the login.
 * @param {string} currentPassword - This is the password that the user entered in the login.
 */
function checkIfLoginIsCorrect(userfound, currentUsername, currentPassword) {
    for (i = 0; i < users.length; i++) {
        if (
            currentUsername == users[i].username &&
            currentPassword == users[i].password
        ) {
            userfound = true;
            loginCurrentUser(currentUsername, currentPassword, i);
        }
    }
    if (!userfound) {
        alert("Wrong Username or Password!");
    }
}

/**
 * This function logs in the current user into the JOIN portal.
 */
function loginCurrentUser(currentUsername, currentPassword, i) {
    generateUserLogin(currentUsername, currentPassword, i);
    saveCurrentUserInLocalStorage();
    location.href = "matrix.html";
}

/**
 * This function generates the user login data.
 *
 *
 * @param {string} currentUsername - This is the username that the user entered in the login.
 * @param {string} currentPassword - This is the password that the user entered in the login.
 */
function generateUserLogin(currentUsername, currentPassword, i) {
    findProfile(i);
    let userLogin = {
        username: currentUsername,
        email: currentEmail,
        password: currentPassword,
        profilePicture: currentProfilePicture,
    };
    currentUser.push(userLogin);
    console.log(currentUser);
}

/**
 * This function is used to find the profile picture and email of the user that enteres his/hers login data.
 *
 *
 * @param {number} i - Numeration of all users.
 */
function findProfile(i) {
    currentProfilePicture = users[i].profilePicture;
    currentEmail = users[i].email;
}

/**
 * This function saves the login data of the user that is currently logged in in the local storage.
 */
function saveCurrentUserInLocalStorage() {
    let currentUserAsString = JSON.stringify(currentUser);
    localStorage.setItem("currentUser", currentUserAsString);
}

/**
 * This function loads the data of all signed up users from the local storage and saves them in the users array when the page is loaded.
 *
 */
function loadAllUsers() {
    let allUsersAsString = localStorage.getItem("users");
    if (allUsersAsString) {
        users = JSON.parse(allUsersAsString);
        console.log(users);
    }
    else {
        saveUsersInLocalStorage();
    }
}

/**
 * This function deletes the currently logged in user.
 */
function logOutCurrentUser() {
    currentUser = [];
    saveCurrentUserInLocalStorage();
}

/**
 * This function opens the window and the background for the sign up.
 */
function openRegistration() {
    document.getElementById("registration-container-overlay").classList.remove("d-none");
    document.getElementById("registration-container").classList.remove("d-none");
}

/**
 * This function closes the window and the background for the sign up.
 */
function closeRegistration() {
    document.getElementById("username").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
    document.getElementById("myImg").src = "img/profileimg/nutzer.svg";
    document.getElementById("registration-container-overlay").classList.add("d-none");
    document.getElementById("registration-container").classList.add("d-none");
}

/**
 * This function loads the currently logged in user.
 */
function loadCurrentUser() {
    let currentUserAsString = localStorage.getItem('currentUser');

    if (currentUserAsString) {
        currentUser = JSON.parse(currentUserAsString);
    }
}
