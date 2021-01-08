let doTasks = [];
let scheduleTasks = [];
let delegateTasks = [];
let eliminateTasks = [];

/**
 * This function sorts the entries of the allTasks array into subsections.
 */
function sortTasks() {
    loadAllTasks();

    for (let i = 0; i < allTasks.length; i++) {
        sortDoTasks(i);
        sortScheduleTasks(i);
        sortDelegateTasks(i);
        sortEliminateTasks(i);
    }
}

/**
 * This function sorts the tasks with do-section into the doTasks array.
 * 
 * 
 * @param {number} i - This represents the number of all tasks.
 */
function sortDoTasks(i) {
    if (allTasks[i].section == 'do') {
        doTasks.push(allTasks[i]);
        let subTasks = doTasks;
        insertTasks(subTasks);
    }
}

/**
 * This function sorts the tasks with schedule-section into the scheduleTasks array.
 * 
 * 
 * @param {number} i - This represents the number of all tasks.
 */
function sortScheduleTasks(i) {
    if (allTasks[i].section == 'schedule') {
        scheduleTasks.push(allTasks[i]);
        let subTasks = scheduleTasks;
        insertTasks(subTasks);
    }
}

/**
 * This function sorts the tasks with delegate-section into the delegateTasks array.
 * 
 * 
 * @param {number} i - This represents the number of all tasks.
 */
function sortDelegateTasks(i) {
    if (allTasks[i].section == 'delegate') {
        delegateTasks.push(allTasks[i]);
        let subTasks = delegateTasks;
        insertTasks(subTasks);
    }
}

/**
 * This function sorts the tasks with eliminate-section into the eliminateTasks array.
 * 
 * 
 * @param {number} i - This represents the number of all tasks.
 */
function sortEliminateTasks(i) {
    if (allTasks[i].section == 'eliminate') {
        eliminateTasks.push(allTasks[i]);
        let subTasks = eliminateTasks;
        insertTasks(subTasks);
    }
}


/**
 * This function inserts the tasks from the subsections into the subsection-fields in the matrix.
 * 
 * 
 * @param {string} subTasks - This string represents a task-section.
 */
function insertTasks(subTasks) {
    for (i = 0; i < subTasks.length; i++) {
        let task = subTasks[i];
        document.getElementById(task.section).innerHTML +=
            generateTask(task);
    }
}

/**
 * This function generates a task card for the matrix
 * 
 * 
 * @param {string} task - This is the task that is put into the matrix.
 * @param {string} section - This string represents a task-section.
 */
function generateTask(task) {
    return `
    <div class="task-card ${task.section}">
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

/**
 * This function generates an image-row of the profile pictures that are involved in the task.
 * 
 * 
 * @param {string} task - This is the task that is put into the matrix.
 */
function generateImageRow(task) {
    let imgRow = `<div class="profile-pictures">`;

    for (j = 0; j < task['assignedPeople'].length; j++) {
        imgRow += `<img class="profile-picture-small" src="${task['assignedPeople'][j]['profilePicture']}">`
    }

    imgRow += `</div>`;
    return imgRow;
}