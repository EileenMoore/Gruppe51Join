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
        <div class="task-card-top">
            <div class="date">${task['date']}</div> 
            <img class="delete-icon" src="./img/delete.png" onclick="openDeleteWindow(${task['id']})">
        </div>
        <div class="task-card-bottom">
            <div class="task-card-left">
                <div class="task-card-headline">${task['title']}</div>
                <div class="task-card-description">${task['description']}</div>
                <button type="button" class="btn btn-primary">${task['category']}</button>
            </div>
        ${generateImageRow(task)}
         </div>
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

/**
 * This function is used to open the delete window.
 * 
 * 
 * @param {number} taskId - This is the ID of the selected task.
 */
function openDeleteWindow(taskId) {
    let task = allTasks.find(t => t['id'] == taskId);
    console.log('Deleting task', task);
    document.getElementById('delete-container-overlay').classList.remove('d-none');
    document.getElementById('delete-container').classList.remove('d-none');

    document.getElementById('delete-container').innerHTML = `
    <div class="delete-window">
        <span>Do you really want to delete this task?</span>
            <div class="button-order">
                <button onclick="deleteTask(${task})" class="btn btn-primary">Yes</button>
                <button onclick="closeDeleteWindow()" class="btn btn-primary">No</button>
            </div>
    </div>`;
}

/**
 * This function is used to close the delete window.
 */
function closeDeleteWindow() {
    document.getElementById('delete-container-overlay').classList.add('d-none');
    document.getElementById('delete-container').classList.add('d-none');
}

/**
 * This function deletes a task.
 * 
 * 
 * @param {string} task - This is task to be deleted.
 */
function deleteTask(task) {
    newtask = task;
}