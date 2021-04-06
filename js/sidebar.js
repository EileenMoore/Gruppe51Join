/**
 * This function displays the profile picture of the currently logged in user.
 */
function loadProfilePicture() {

    loadCurrentUser();

    document.getElementById('profilePicture').innerHTML += `
    <img class="profile-picture" src="${currentUser[0].profilePicture}">
    `

    document.getElementById('profilePictureResponsive').innerHTML += `
    <img class="profile-picture" src="${currentUser[0].profilePicture}">
    `
}