/**
 * This function display the tasks in the list
 */
function generateListItem() {
    loadAllTasks();

    for (i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];

        document.getElementById('taskdelegate').innerHTML += `
<div class="task-listed ${allTasks[i].section}"><div>
<div class="assigned-content"><div>${generateImgRow(allTasks[i])}</div></div></div>
<div class="category-content">${allTasks[i]['category']}</div>
<div class="details-content">${allTasks[i]['description']}</div>
</div>`;
    }
}
function generateImgRow(task) {
    let html = '';
    for (let j = 0; j < task.assignedPeople.length; j++) {

        const asignee = task.assignedPeople[j];

        html += `<div class = "assignee-section"><div class="assigned-img"><img src="${asignee.profilePicture}"></div>
        <div class="contact-data-section"><div>${asignee.username}${asignee.email}</div></div></div>`;
    }
    return html;
}
