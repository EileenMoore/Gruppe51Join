let doTasks = [];
let scheduleTasks = [];
let delegateTasks = [];
let eliminateTasks = [];
let draggingTask;
/**
 * This function sorts the entries of the allTasks array into subsections.
 */
async function sortTasks() {
    await loadAllTasks();
    updateHTML();
}

function updateHTML() {
    clearSubTasks();
    clearMatrixFields();
    for (let i = 0; i < allTasks.length; i++) {
        sortDoTasks(i);
        sortScheduleTasks(i);
        sortDelegateTasks(i);
        sortEliminateTasks(i);
    }
}
/**
 * This function empties the sub tasks arrays.
 */
function clearSubTasks() {
    doTasks = [];
    scheduleTasks = [];
    delegateTasks = [];
    eliminateTasks = [];
}
/**
 * This function empties the tasks in matrix fields.
 */
function clearMatrixFields() {
    document.getElementById("do").innerHTML = "";
    document.getElementById("schedule").innerHTML = "";
    document.getElementById("delegate").innerHTML = "";
    document.getElementById("eliminate").innerHTML = "";
}
/**
 * This function sorts the tasks with do-section into the doTasks array.
 *
 *
 * @param {number} i - This represents the number of all tasks.
 */
function sortDoTasks(i) {
    if (allTasks[i].section == "do") {
        doTasks.push(allTasks[i]);
        let subTasks = doTasks;
        document.getElementById("do").innerHTML = "";
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
    if (allTasks[i].section == "schedule") {
        scheduleTasks.push(allTasks[i]);
        let subTasks = scheduleTasks;
        document.getElementById("schedule").innerHTML = "";
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
    if (allTasks[i].section == "delegate") {
        delegateTasks.push(allTasks[i]);
        let subTasks = delegateTasks;
        document.getElementById("delegate").innerHTML = "";
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
    if (allTasks[i].section == "eliminate") {
        eliminateTasks.push(allTasks[i]);
        let subTasks = eliminateTasks;
        document.getElementById("eliminate").innerHTML = "";
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
        document.getElementById(task.section).innerHTML += generateTask(task);
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
    <div class="task-card ${
      task.section
    }" id="drag" draggable="true" ondragstart="drag(${task["id"]})">
        <div class="task-card-top">
            <div class="date">${task["date"]}</div> 
            <img title="delete" class="delete-icon" src="./img/delete.png" onclick="openDeleteWindow(${
              task["id"]
            })">
        </div>
        <div class="task-card-bottom">
            <div class="task-card-left">
                <div class="task-card-headline">${task["title"]}</div>
                <div class="task-card-description">${task["description"]}</div>
                <div class="category"><span>${task["category"]}</span></div>
            </div>
        ${generateImageRow(task)}
         </div>
    </div>`;
}
/**
 * This function generates an image-row of the profile pictures that are involved in the task.
 *
 *
 * @param {string} task - This is the task that is put into the matrix.
 */
function generateImageRow(task) {
    let imgRow = `<div class="profile-pictures">`;
    for (j = 0; j < task["assignedPeople"].length; j++) {
        imgRow += `<img class="profile-picture-small" src="${task["assignedPeople"][j]["profilePicture"]}">`;
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
    document
        .getElementById("delete-container-overlay")
        .classList.remove("d-none");
    document.getElementById("delete-container").classList.remove("d-none");
    document.getElementById("delete-container").innerHTML = `
    <div class="delete-window">
        <span>Do you really want to delete this task?</span>
            <div class="button-order">
                <button onclick="deleteTask(${taskId})" class="btn btn-primary">Yes</button>
                <button onclick="closeDeleteWindow()" class="btn btn-primary">No</button>
            </div>
    </div>`;
}
/**
 * This function is used to close the delete window.
 */
function closeDeleteWindow() {
    document.getElementById("delete-container-overlay").classList.add("d-none");
    document.getElementById("delete-container").classList.add("d-none");
}
/**
 * This function deletes a task.
 *
 *
 * @param {string} task - This is the task to be deleted.
 */
function deleteTask(taskId) {
    allTasks = allTasks.filter((t) => t["id"] != taskId);
    backend.setItem("allTasks", JSON.stringify(allTasks));
    closeDeleteWindow();
    sortTasks();
}
/**
 * This method allows to drop an element over an area
 * @param {DataTransfer} ev
 */
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * This method saves the id of the element that is being dragged
 * @param {DataTransfer} ev
 */
function drag(id) {
    draggingTask = id;
    // ev.dataTransfer.setData("text", ev.target.id);
}
/**
 * This method controls if drop is performed inside the correct area marked with "drop-area"
 * @param {DataTransfer} ev
 */
function drop(ev) {
    ev.target.classList.forEach((cssClass) => {
        if (cssClass === "drop-area") {
            performDropTask(ev);
        }
    });
}

function moveTo(section) {
    let currentTask = allTasks.find((t) => t["id"] == draggingTask); // Findet aktuellen Task
    currentTask.section = section;
    update(currentTask);
    console.log('This task should be moved to "Schedule"', currentTask);
    updateHTML();
    // TODO: Update on Server
}
/**
 * This method performs drop of the dropdown
 * and switches the task to its new place & calls the update function
 * @param {DataTransfer} ev
 */
function performDropTask(ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(id));
}


/**
 * This function will update the importance and urgency after drag and drop to each section
 * 
 * @param {object} currentTask 
 */
function update(currentTask) {
    if (currentTask.section == "do") {
        currentTask.urgency = "high";
        currentTask.importance = "high";
    }
    if (currentTask.section == "schedule") {
        currentTask.urgency = "low";
        currentTask.importance = "high";
    }
    if (currentTask.section == "delegate") {
        currentTask.urgency = "high";
        currentTask.importance = "low";
    }
    if (currentTask.section == "eliminate") {
        currentTask.urgency = "low";
        currentTask.importance = "low";
    }
}