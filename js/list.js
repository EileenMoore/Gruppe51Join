function generateListItem(persons, task) {
    return `
    <div class="task-item-content">
    <div class="assigned-content">
        <img src="${persons.img}" class="assigned-img rounded-circle">
        <div>${persons.name}<br>${user.email}</div>
    </div>
    <div class="category-content">${task.category}</div>
    <div class="details-content">${task.description}</div>
    </div>
`;
}
