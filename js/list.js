/**
 * This function shows the tasks in the list
 */
function generateListItem() {
    loadAllTasks();

    for (i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];

        document.getElementById('taskdelegate').innerHTML += `
<div class="task-item-content ${allTasks[i].section}">
<div class="assigned-content">
${generateImgRow(allTasks[i])}
<div class="category-content">${allTasks[i]['category']}</div>
<div class="details-content">${allTasks[i]['description']}</div>
</div>`;
    }
}
function generateImgRow(task) {
    let html = '';
    for (let j = 0; j < task.assignedPeople.length; j++) {

        const asignee = task.assignedPeople[j];

        html += `<img src="${asignee.profilePicture}" class="assigned-img rounded-circle">
        <div>${asignee.username}<br>${asignee.email}</div>
</div>`;
    }
    return html;
}
