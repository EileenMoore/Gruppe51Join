function generateListItem() {
    loadAllTasks();
    for (i = 0; i < allTasks.length; i++) {
        for (j = 0; j < allTasks[i].assignedPeople.length; j++) {
            const assignedPeople = allTasks[j].assignedPeople[j];
            document.getElementById('taskdelegate').innerHTML += `
    <div class="task-item-content">
    <div class="assigned-content">
        <img src="${allTasks[i]['assignedPeople'][j]['profilePicture']}" class="assigned-img rounded-circle">
        <div>${assignedPeople.username}<br>${assignedPeople.email}</div>
    </div>
    <div class="category-content">${allTasks[i]['category']}</div>
    <div class="category-content">${allTasks[i]['description']}</div>
    </div>`;
        }
    }
}