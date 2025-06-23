
// selected Elements To Use
let input = document.querySelector(".input");
let submit = document.querySelector(".send");
let taskDiv = document.querySelector(".tasks");
let tasksArray = [];
// push tasks from LocalStorage to tasksArray if it has tasks
if (localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
}
// add tasks from LocalStorage to page if it has tasks
getTasksFromLocalStorage ();
// 
taskDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        // delete task from local Storage
        deleteTask(e.target.parentElement.getAttribute("data-id"));
        // delete task from page
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        // toggle task status task true or false
        toggleStatusWith(e.target.getAttribute("data-id"));
        // toggle class done 
        e.target.classList.toggle("done");
    }
});
// ***************
submit.onclick = function () {
    if (input.value != "") {
        addTasksToArrayTasks (input.value);
        input.value = "";
    }
}
// ************************
function addTasksToArrayTasks (taskText) {
    const task = {
        id : Date.now(),
        title : taskText,
        status : false
    };
    tasksArray.push (task);
    addTasksToPage (tasksArray);
    addTasksToLocalStorage (tasksArray);
}
// *******************************
function addTasksToPage (tasksArray) {
    taskDiv.innerHTML = "";
    tasksArray.forEach( (ele) => {
        let div = document.createElement ("div");
        ele.status == true ? div.className = "task done" : div.className = "task"; 
        div.setAttribute("data-id", ele.id);
        div.appendChild (document.createTextNode(ele.title));
        let span = document.createElement ("span");
        span.className = "delete"; 
        span.setAttribute("data-id", ele.id); // not important
        span.appendChild (document.createTextNode("Delete"));
        div.appendChild (span);
        taskDiv.appendChild (div);
    });
}
// ********************************
function addTasksToLocalStorage (tasksArray) {
    localStorage.setItem ("tasks", JSON.stringify(tasksArray));
}
// ********************************
function getTasksFromLocalStorage () {
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse (data);
        addTasksToPage(tasks);
    }
}
// ***************************
function deleteTask (taskId) {
    tasksArray = tasksArray.filter((ele) => ele.id != taskId);
    addTasksToLocalStorage (tasksArray);
}
function toggleStatusWith (taskId) {
    for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id == taskId) {
            tasksArray[i].status == false ? (tasksArray[i].status = true) : (tasksArray[i].status = false);
        }
    }
    addTasksToLocalStorage (tasksArray);
}
// **********************
function deleteAllTasks() {
    localStorage.removeItem("tasks");
    taskDiv.innerHTML = "";
}
// localStorage.removeItem("tasks");
