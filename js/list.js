
function generateListItem() {
    for (i = 0; i < persons.length; i++) {
        document.getElementById('taskdelegate').innerHTML +=`
    <div class="task-item-content">
    <div class="assigned-content">
        <img src="${persons[i].img}" class="assigned-img rounded-circle">
        <div>${persons[i].name}<br>${persons[i].mail}</div>
    </div>
    <div class="category-content">Sales</div>
    </div>
`;
    }
}
