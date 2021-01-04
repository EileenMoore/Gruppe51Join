function insertTaskInDo() {

    for (i = 0; i < persons.length; i++) {
        document.getElementById('do').innerHTML += `
    <div class="task-card do">
    <span class="date">12.05.20</span>
    <span class="task-card-headline">Prepare Presentation</span>
    <span class="task-card-description">Some description goes here ...</span>
    <div class="task-card-bottom">
        <button type="button" class="btn btn-primary">Marketing</button>
        <div class="profile-picture-small"> <img class="profile-picture-small" src="${persons[i]["img"]}"></div>
    </div>
</div>
    `;

        document.getElementById('schedule').innerHTML += `
    <div class="task-card schedule">
    <span class="date">12.05.20</span>
    <span class="task-card-headline">Prepare Presentation</span>
    <span class="task-card-description">Some description goes here ...</span>
    <div class="task-card-bottom">
        <button type="button" class="btn btn-primary">Marketing</button>
        <div class="profile-picture-small"> <img class="profile-picture-small" src="${persons[i]["img"]}"></div>
    </div>
</div>
    `;

        document.getElementById('delegate').innerHTML += `
    <div class="task-card delegate">
    <span class="date">12.05.20</span>
    <span class="task-card-headline">Prepare Presentation</span>
    <span class="task-card-description">Some description goes here ...</span>
    <div class="task-card-bottom">
        <button type="button" class="btn btn-primary">Marketing</button>
        <div class="profile-picture-small"> <img class="profile-picture-small" src="${persons[i]["img"]}"></div>
    </div>
</div>
    `;

        document.getElementById('eliminate').innerHTML += `
    <div class="task-card eliminate">
    <span class="date">12.05.20</span>
    <span class="task-card-headline">Prepare Presentation</span>
    <span class="task-card-description">Some description goes here ...</span>
    <div class="task-card-bottom">
        <button type="button" class="btn btn-primary">Marketing</button>
        <div class="profile-picture-small"> <img class="profile-picture-small" src="${persons[i]["img"]}"></div>
    </div>
</div>
    `;
    }
}