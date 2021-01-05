/**
 * This function shows the tasks in the list
 */

function generateListItem() {
    loadAllTasks();
    for (i = 0; i < allTasks.length; i++) {
        for (j = 0; j < allTasks[i].assignedPeople.length; j++){
            let assignedPeople = allTasks[i].assignedPeople[j];
        document.getElementById('taskdelegate').innerHTML += `
    <div class="task-item-content ${allTasks[i].section}">
    <div class="assigned-content">
        <img src="${allTasks[i]['assignedPeople'][j]['profilePicture']}" class="assigned-img rounded-circle">
        <div>${assignedPeople.username}<br>${assignedPeople.email}</div>
    </div>
    <div class="category-content">${allTasks[i]['category']}</div>
    <div class="category-content">${allTasks[i]['description']}</div>
    </div>`;
        }  }
}
