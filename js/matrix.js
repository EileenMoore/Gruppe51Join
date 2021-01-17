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
    updateHTML();
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

/**
 * This function changes the section-value of the task that is dragged into another section.
 *
 *
 * @param {string} section
 */
function moveTo(section) {
    let currentTask = allTasks.find((t) => t["id"] == draggingTask); // Finds current task

    originSection = currentTask.section;
    currentTask.section = section;
    updateUandIandDate(currentTask, originSection);

    allTasks = allTasks.filter((t) => t["id"] != draggingTask);
    allTasks.push(currentTask);
    backend.setItem("allTasks", JSON.stringify(allTasks));

    updateHTML();
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
 * This function will update the importance and urgency and the Due Date after drag and drop to each section
 *
 * @param {object} currentTask
 *
 */
function updateUandIandDate(currentTask, originSection) {
    updateDoSection(currentTask, originSection);
    updateScheduleSection(currentTask, originSection);
    updateDelegateSection(currentTask, originSection);
    updateEliminateSection(currentTask, originSection);
}

/**
 * This function updates the urgency, importance and due date of the task that is dragged into the do-section.
 *
 *
 * @param {string} currentTask
 * @param {string} originSection
 */
function updateDoSection(currentTask, originSection) {
    if (currentTask.section == "do" && originSection == "schedule") {
        currentTask.urgency = "High";
        currentTask.importance = "High";
        today(currentTask);
    }
    if (currentTask.section == "do" && originSection == "eliminate") {
        currentTask.urgency = "High";
        currentTask.importance = "High";
        today(currentTask);
    }
    if (currentTask.section == "do" && originSection == "delegate") {
        currentTask.urgency = "High";
        currentTask.importance = "High";
    }
}

/**
 * This function updates the urgency, importance and due date of the task that is dragged into the schedule-section.
 *
 *
 * @param {string} currentTask
 * @param {string} originSection
 */
function updateScheduleSection(currentTask, originSection) {
    if (currentTask.section == "schedule" && originSection == "do") {
        currentTask.urgency = "Low";
        currentTask.importance = "High";
        inFourDays(currentTask);
    }
    if (currentTask.section == "schedule" && originSection == "delegate") {
        currentTask.urgency = "Low";
        currentTask.importance = "High";
        inFourDays(currentTask);
    }
    if (currentTask.section == "schedule" && originSection == "eliminate") {
        currentTask.urgency = "Low";
        currentTask.importance = "High";
    }
}

/**
 * This function updates the urgency, importance and due date of the task that is dragged into the delegate-section.
 *
 *
 * @param {string} currentTask
 * @param {string} originSection
 */
function updateDelegateSection(currentTask, originSection) {
    if (currentTask.section == "delegate" && originSection == "eliminate") {
        currentTask.urgency = "High";
        currentTask.importance = "Low";
        today(currentTask);
    }
    if (currentTask.section == "delegate" && originSection == "schedule") {
        currentTask.urgency = "High";
        currentTask.importance = "Low";
        today(currentTask);
    }
    if (currentTask.section == "delegate" && originSection == "do") {
        currentTask.urgency = "High";
        currentTask.importance = "Low";
    }
}
/**
 * This function updates the urgency, importance and due date of the task that is dragged into the eliminate-section.
 *
 *
 * @param {string} currentTask
 * @param {string} originSection
 */
function updateEliminateSection(currentTask, originSection) {
    if (currentTask.section == "eliminate" && originSection == "do") {
        currentTask.urgency = "Low";
        currentTask.importance = "Low";
        inFourDays(currentTask);
    }
    if (currentTask.section == "eliminate" && originSection == "delegate") {
        currentTask.urgency = "Low";
        currentTask.importance = "Low";
        inFourDays(currentTask);
    }
    if (currentTask.section == "eliminate" && originSection == "schedule") {
        currentTask.urgency = "Low";
        currentTask.importance = "Low";
    }
}
/**
 * This function generates today'S date as due date fpr the task.
 *
 *
 * @param {object} currentTask
 */
function today(currentTask) {
    let today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    let dmy = y + "." + m + "." + d;

    currentTask.date = dmy;
}
/**
 * This function generates the date four days in the furture from today'S date as due date for the task.
 *
 *
 * @param {object} currentTask
 */
function inFourDays(currentTask) {
    let today = new Date();
    var d = today.getDate() + 4;
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    let dmy = y + "." + m + "." + d;
    currentTask.date = dmy;
}