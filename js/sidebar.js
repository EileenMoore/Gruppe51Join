
function loadProfilePicture() {

    loadCurrentUser();

    document.getElementById('profilePicture').innerHTML += `
    <img class="profile-picture" src="${currentUser[0].profilePicture}">
    `
}