
function loadCurrentUser() {
    let currentUserAsString = localStorage.getItem('currentUser');

    if (currentUserAsString) {
        currentUser = JSON.parse(currentUserAsString);
        console.log(currentUser);
    }
}

function insertTasks() {

    loadAllTasks();
    loadAllUsers();
    loadCurrentUser();
    console.log(allTasks);
    console.log(users);

    for (i = 0; i < allTasks.length; i++) {
        document.getElementById('do').innerHTML += `
    <div class="task-card do">
    <span class="date">${allTasks[i]['date']}</span>
    <span class="task-card-headline">${allTasks[i]['title']}</span>
    <span class="task-card-description">${allTasks[i]['discription']}</span>
    <div class="task-card-bottom">
        <button type="button" class="btn btn-primary">${allTasks[i]['category']}</button>
        <div class="profile-picture-small"> <img class="profile-picture-small" src="${allTasks[i]['assignedPerson'][0]['img']}"></div>
        <img id="myImage" src"">
    </div>
    </div>
    `;
    }
}

