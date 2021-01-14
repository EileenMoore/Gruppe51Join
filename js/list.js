/**
 * This function display the tasks in the list
 */
async function generateListItem() {
    await loadAllTasks();

    for (i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];

        document.getElementById('taskdelegate').innerHTML += `
<div class="task-listed ${allTasks[i].section}">
<div class="assigned-content"><div>${generateImgRow(allTasks[i])}</div></div>
<div class="category-content">${allTasks[i]['category']}</div>
<div class="title-content">${allTasks[i]['title']}</div>
<div class="details-content">${allTasks[i]['description']}</div>
<img class="delete-img" src="img/delete.svg" onclick="openDeleteWindowList(${task['id']})">
</div>`;
    }
}

/**
 * This function generates the details of the current user
 * @param {string} task 
 */
function generateImgRow(task) {
    let html = '';
    for (let j = 0; j < task.assignedPeople.length; j++) {

        const asignee = task.assignedPeople[j];

        html += `<div class = "assignee-section"><div class="assigned-img"><img src="${asignee.profilePicture}"></div>
        <div class="contact-data-section"><div>${asignee.username}<br>${asignee.email}</div></div></div>`;
    }
    return html;
}


/**
 * This function is used to open the delete window in the list.
 * 
 * 
 * @param {number} taskId - This is the ID of the selected task.
 */
function openDeleteWindowList(taskId) {
    document.getElementById('delete-container-list').classList.remove('d-none');

    document.getElementById('delete-container-list').innerHTML = `
    <div class="delete-window">
        <span>Do you really want to delete this task?</span>
            <div class="button-order">
                <button onclick="deleteTaskList(${taskId})" class="btn btn-primary">Yes</button>
                <button onclick="closeDeleteWindowList()" class="btn btn-primary">No</button>
            </div>
    </div>`;
}

/**
 * This function is used to close the delete window.
 */
function closeDeleteWindowList() {
    document.getElementById('delete-container-list').classList.add('d-none');
}


/**
 * This function deletes a task.
 * 
 * 
 * @param {string} task - This is the task to be deleted.
 */
function deleteTaskList(taskId) {
    allTasks = allTasks.filter(t => t['id'] != taskId);
    backend.setItem('allTasks', JSON.stringify(allTasks));
    closeDeleteWindowList();
    document.getElementById('taskdelegate').innerHTML = '';
    generateListItem();
}


