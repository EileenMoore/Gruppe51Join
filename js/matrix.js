let doTasks = [];
let scheduleTasks = [];
let delegateTasks = [];
let eliminateTasks = [];

function sortTasks() {
    loadAllTasks();

    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].section == 'Do')
            doTasks.push(allTasks[i]);

        if (allTasks[i].section == 'Schedule')
            scheduleTasks.push(allTasks[i]);

        if (allTasks[i].section == 'Delegate')
            delegateTasks.push(allTasks[i]);

        if (allTasks[i].section == 'Eliminate')
            eliminateTasks.push(allTasks[i]);
    }
}

function insertTasks() {
    sortTasks();
    let section;

    insertDoTasks(section) ;
    insertScheduleTasks(section);
    insertDelegateTasks(section);
    insertEliminateTasks(section);
}

function insertDoTasks(section) {
    for (i = 0; i < doTasks.length; i++) {
        const task = doTasks[i];
        section = 'do';
        document.getElementById('do').innerHTML +=
            generateTask(task, section);
    }
}

function insertScheduleTasks(section) {
    for (i = 0; i < scheduleTasks.length; i++) {
        const task = scheduleTasks[i];
        section = 'schedule';
        document.getElementById('schedule').innerHTML +=
            generateTask(task, section);
    }
}

function insertDelegateTasks(section) {
    for (i = 0; i < delegateTasks.length; i++) {
        const task = delegateTasks[i];
        section = 'delegate';
        document.getElementById('delegate').innerHTML +=
            generateTask(task, section);
    }
}

function insertEliminateTasks(section) {
    for (i = 0; i < eliminateTasks.length; i++) {
        const task = eliminateTasks[i];
        section = 'eliminate';
        document.getElementById('eliminate').innerHTML +=
            generateTask(task, section);
    }
}

function generateTask(task, section) {
    return `
    <div class="task-card ${section}">
    <div class="task-card-left">
        <div>
            <div class="date">${task['date']}</div>
            <div class="task-card-headline">${task['title']}</div>
            <div class="task-card-description">${task['description']}</div>
        </div>
    <button type="button" class="btn btn-primary">${task['category']}</button>
    </div>
    ${generateImageRow(task)}
</div>`
}

function generateImageRow(task) {
    let imgRow = `<div class="profile-pictures">`;

    for (j = 0; j < task['assignedPeople'].length; j++) {
        imgRow += `<img class="profile-picture-small" src="${task['assignedPeople'][j]['profilePicture']}">`
    }

    imgRow += `</div>`;
    return imgRow;
}

