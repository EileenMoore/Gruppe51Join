function generateListItem() {
    loadAllTasks();
    for (i = 0; i < allTasks.length; i++) {
        for (j = 0; j < allTasks[i].assignedPerson.length; j++){
        document.getElementById('taskdelegate').innerHTML += `
    <div class="task-item-content">
    <div class="assigned-content">
        <img src="${allTasks[i]['assignedPerson'][j]['profilePicture']}" class="assigned-img rounded-circle">
        <div>${allTasks[i].username}<br>${allTasks[i].email}</div>
    </div>
    <div class="category-content">${allTasks[i]['category']}</div>
    <div class="category-content">${allTasks[i]['discription']}</div>
    </div>
`;
        }  }
}
