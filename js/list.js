function generateListItem(user, task) {
    return `
    <div class="task-item-content  ${task.display}">
    <div class="assigned-content">
        <img src="${user.img}" class="assigned-img rounded-circle">
        <div>${user.name}<br>${user.email}</div>
    </div>
    <div class="category-content">${task.category}</div>
    <div class="details-content">${task.description}</div>
    </div>
`;
}
