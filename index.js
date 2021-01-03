let users = [];
let currentUser = [];

let profilePictureAsDataURL = [];
let currentProfilePicture = [];
let currentEmail = [];

function signUp() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = generateUser(username, email, password);

    users.push(user);
    console.log(user);
    alert('Your registration was succsessful. You can now login!')
    saveUsersInLocalStorage();
}

function generateUser(username, email, password) {
    return {
        'username': username,
        'email': email,
        'password': password,
        'profilePicture': profilePictureAsDataURL
    }
}

function saveUsersInLocalStorage() {
    let allUsersAsString = JSON.stringify(users);
    localStorage.setItem('users', allUsersAsString);
}

function login() {
    let currentUsername = document.getElementById('currentUsername').value;
    let currentPassword = document.getElementById('currentPassword').value;
    let userfound = false;

    checkIfLoginIsCorrect(userfound, currentUsername, currentPassword);
    saveCurrentUserInLocalStorage();
}

function checkIfLoginIsCorrect(userfound, currentUsername, currentPassword) {
    for (i = 0; i < users.length; i++) {
        if (currentUsername == users[i].username && currentPassword == users[i].password) {
            userfound = true;
            generateUserLogin(currentUsername, currentPassword);
            location.href = "matrix.html";
        }
    } if (!userfound) {
        alert('Wrong Username or Password!');
    }
}

function findProfile(i) {
    currentProfilePicture = users[i].profilePicture;
    currentEmail = users[i].email;
}

function generateUserLogin(currentUsername, currentPassword) {
    findProfile(i);
    let userLogin =  {
        'username': currentUsername,
        'email': currentEmail,
        'password': currentPassword,
        'profilePicture': currentProfilePicture
    };
    currentUser.push(userLogin);
    console.log(currentUser);
}

function saveCurrentUserInLocalStorage() {
    let currentUserAsString = JSON.stringify(currentUser);
    localStorage.setItem('currentUser', currentUserAsString);
}

function loadAllUsers() {
    let allUsersAsString = localStorage.getItem('users');
    currentUser = [];
    saveCurrentUserInLocalStorage();

    if (allUsersAsString) {
        users = JSON.parse(allUsersAsString);
        console.log(users);
    }
}

function openRegistration() {
    document.getElementById('registration-container-overlay').classList.remove('d-none');
}

function closeRegistration() {
    document.getElementById('registration-container-overlay').classList.add('d-none');
}

window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            image = document.getElementById('myImg');  // $('img')[0]
            image.src = URL.createObjectURL(this.files[0]); // set src to blob url

            let imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");

            imgCanvas.width = image.width;
            imgCanvas.height = image.height;
            imgContext.drawImage(image, 0, 0, image.width, image.height);
            profilePictureAsDataURL = imgCanvas.toDataURL("image/png");
        }
    });
});
