let doTasks = [];
let scheduleTasks = [];
let delegateTasks = [];
let eliminateTasks = [];

/**
 * This function sorts the entries of the allTasks array into subsections.
 */
function sortTasks() {
    loadAllTasks();
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
        console.log(subTasks);
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
        document.getElementById(task.section).innerHTML += generateTask(task, i);
    }
}

/**
 * This function generates a task card for the matrix
 *
 *
 * @param {string} task - This is the task that is put into the matrix.
 * @param {string} section - This string represents a task-section.
 */
function generateTask(task, index) {
    return `
    <div class="task-card ${task.section}" draggable="true" ondragstart="startDragging(${index}, ${task.section})">
        <div class="task-card-top">
            <div class="date">${task["date"]}</div> 
            <img class="delete-icon" src="./img/delete.png" onclick="openDeleteWindow(${task["id"]
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
    allTasks = allTasks.filter(t => t['id'] != taskId);
    backend.setItem('allTasks', JSON.stringify(allTasks));
    closeDeleteWindow();
    sortTasks();
}


/* 
/**
 * This method allows to drop an element over an area
 * @param {DataTransfer} ev
 */
/* function allowDrop(ev) {
    ev.preventDefault();
} */

/**
* This method saves the id of the element that is being dragged
* @param {DataTransfer} ev 
*/
/* function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
} */

/**
 * This method controls if drop is performed inside the correct area marked with "drop-area"
 * @param {DataTransfer} ev
 */
/* function drop(ev) {
    ev.preventDefault();
    let id = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(id));
} */

/* function dropToScheduleHigh(event) {
event
} */


/* const draggables = document.querySelectorAll('.task-card');
const matrixQuarters = document.querySelectorAll('.matrix-quarter');

matrixQuarters.forEach(matrixQuarter => {
    matrixQuarter.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(matrixQuarter, e.clientY);
        const draggable = document.querySelector('.task-card');
        if (afterElement == null) {
            matrixQuarter.appendChild(draggable);
        } else {
            matrixQuarter.insertBefore(draggable, afterElement);
        };
    });
});

function getDragAfterElement(matrixQuarter, y) {
    const draggableElements = [...matrixQuarter.querySelectorAll('.task-card:not (.task-card)')];
   
   return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
               return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}; */

let todo = [];
let done = [];
let currentElement;
let currentDraggedTaskSection='';

function startDragging(id, taskSection) {
    currentElement = id;
    console.log(currentElement);
    currentDraggedTaskSection = taskSection.id;
}

function initCategoryContainer( categoryElement, tasks){

    for (let index = 0; index < tasks.length; index++) {
        if(!tasks[index]){
            console.log("Task " +index+ " is undefinde!")
            continue;
        }
         const task = tasks[index];
         console.log("Task "+ index, task);
         categoryElement.innerHTML += generateTask(task, index);
     }

}

function showTasks() {
    containerDO.innerHTML = '';
    containerSCHEDULE.innerHTML = '';
    containerDELEGATE.innerHTML = '';
    containerELIMINATE.innerHTML = '';
    initCategoryContainer(containerDO, doTasks);
    initCategoryContainer(containerSCHEDULE, scheduleTasks);
    initCategoryContainer(containerDELEGATE, delegateTasks);
    initCategoryContainer(containerELIMINATE, eliminateTasks);
}
function drop() {
    //currentTask['importance'] = 'Low'; // Ist ein JSON  
    // 1. Element zu done hinzufügen
    done.push(todo[currentElement]);
    // 2. Element aus todo entfernen
    todo.splice(currentElement, 1);
    // 3. HTML updaten
    showTasks();
}
function dropToDoList() {
    //currentTask['importance'] = 'High'; // Ist ein JSON
    // 1. Element zu todo hinzufügen
    todo.push(done[currentElement]);
    // 2. Element aus done entfernen
    done.splice(currentElement, 1);
    // 3. HTML updaten
   // showTasks();

    //currentElement index from tasks array
    //currentDraggedTaskSection section name from task
    //TODO 
    //1. find array of current dragged task section

    let currentDraggedTaskArray = getCurrentDraggedTaskArray();
    doTasks.push(currentDraggedTaskArray[currentElement]);
    deleteTaskFromCurrentDraggSection();

    showTasks();


    ///2. push the dragged element from current dragged task array to doTasks array

    //3 delete task from current dragged task array
}
function allowDrop(ev) {
    ev.preventDefault();

}

function getCurrentDraggedTaskArray(){
    switch (currentDraggedTaskSection){
        case 'eliminate':
            return eliminateTasks;
    }
}

function deleteTaskFromCurrentDraggSection(){
    switch (currentDraggedTaskSection){
        case 'eliminate':
            eliminateTasks.splice(currentElement, 1);
            break;
    }
}