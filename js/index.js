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
 * This function is used to create an account for a new user when the user enters username, email and password.
 *
 * @param {}
 */
function signUp() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = generateUser(username, email, password);

    users.push(user);
    console.log(user);
    console.log(currentUser);
    alert("Your registration was succsessful. You can now login!");
    saveUsersInLocalStorage();
}

/**
 * This function generates the user data for a new user.
 *
 *
 * @param {string} username - This is the name of the user.
 * @param {string} email - This is the email of the user.
 * @param {string} password - This is the password of the user.
 */
function generateUser(username, email, password) {
    return {
        username: username,
        email: email,
        password: password,
        profilePicture: profilePictureAsDataURL,
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
            generateUserLogin(currentUsername, currentPassword);
            saveCurrentUserInLocalStorage();
            location.href = "matrix.html";
        }
    }
    if (!userfound) {
        alert("Wrong Username or Password!");
    }
}

/**
 * This function generates the user login data.
 *
 *
 * @param {string} currentUsername - This is the username that the user entered in the login.
 * @param {string} currentPassword - This is the password that the user entered in the login.
 */
function generateUserLogin(currentUsername, currentPassword) {
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
    document
        .getElementById("registration-container-overlay")
        .classList.remove("d-none");
    document.getElementById("registration-container").classList.remove("d-none");
}

/**
 * This function closes the window and the background for the sign up.
 */
function closeRegistration() {
    document
        .getElementById("registration-container-overlay")
        .classList.add("d-none");
    document.getElementById("registration-container").classList.add("d-none");
}

/**
 * This function is used to upload a profile picture from the file-inputfield and display it in the sign-up window.
 */
window.addEventListener("load", function() {
    document
        .querySelector('input[type="file"]')
        .addEventListener("change", function() {
            if (this.files && this.files[0]) {
                image = document.getElementById("myImg"); // $('img')[0]
                image.src = URL.createObjectURL(this.files[0]); // set src to blob url
                getCanvas(image);
            }
        });
});

/**
 * This function creates a canvas for the image and converts it to an URL.
 */
function getCanvas(image) {
    let imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    imgCanvas.width = image.width;
    imgCanvas.height = image.height;
    imgContext.drawImage(image, 0, 0, image.width, image.height);
    profilePictureAsDataURL = imgCanvas.toDataURL("image/png");
}