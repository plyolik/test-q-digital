let taskArray = []

const ready = 'READY'
const unready = 'UNREADY'
const taskStatusUnreadyClass = 'task-status_unready'
const taskStatusReadyClass = 'task-status_ready'

const taskInput = document.querySelector('.input');
const addTaskBtn = document.querySelector('.btn-add-task')
const removeAllTaskBtn = document.querySelector('.btn-remove-all')
const readyAllTaskBtn = document.querySelector('.btn-ready-all')
const taskListDiv = document.querySelector('.task-list')

function addTaskElement(task, index) {
    let status = ready;
    let statusColor = taskStatusUnreadyClass

    if (task.status) {
        status = unready
        statusColor = taskStatusReadyClass
    }

    let element = `
        <div class="task-container">
            <div class="task-content">
                <p class="task-title">${task.task}</p>
                <div class="container-btn">
                    <button class="btn btn-status">${status}</botton>
                    <button class="btn btn-delete">DELETE</botton>
                </div>
            </div>
            <div class="task-status ${statusColor}"></div>
        </div>
        <div class="divider"></div>
    `

    const div = document.createElement('div')
    div.setAttribute('data-index', `${index}`)
    taskListDiv.appendChild(div)
    div.innerHTML = element
    
    div.querySelector('.btn-status').addEventListener('click', ()=> changeStatus(div, task))
    div.querySelector('.btn-delete').addEventListener('click', ()=> removeTask(div, index))
}

function removeTask(div, index) {
    taskListDiv.removeChild(div)
    taskArray.splice(index, 1)
    saveTasks()
}

function changeStatus(div, task) {
    task.status = !task.status

    status = ready;
    statusColor = 'task-status_unready'

    if (task.status) {
        status = unready
        statusColor = 'task-status_ready'
    }

    div.querySelector('.btn-status').textContent = status
    div.querySelector('.task-status').className = `task-status ${statusColor}`
    saveTasks()
}

function addTask() {
    let currentTask = taskInput.value
    if (taskInput.value !== '') {
        let obj = {
            task: currentTask,
            status: false
        }
        taskArray.push(obj)
        addTaskElement(obj, taskArray.indexOf(obj))
    } 
    saveTasks()
    taskInput.value = ''
}

function removeAllTasks() {
    if (taskArray.length !== 0) {
        taskArray = []
        taskListDiv.innerHTML = ''
        localStorage.clear()
    }
}

function readyAllTasks() {
    taskListDiv.innerHTML = ''
    taskArray.forEach((element, i) => {
        element.status = true
        addTaskElement(element, i)
    })
    saveTasks()
}

function onStartUp() {
    addTaskBtn.addEventListener('click', addTask)
    removeAllTaskBtn.addEventListener('click', removeAllTasks)
    readyAllTaskBtn.addEventListener('click', readyAllTasks)

    let taskArrayJson = localStorage.getItem('taskArray')
    if (!taskArrayJson) return

    taskArray = JSON.parse(taskArrayJson)
    taskArray.forEach((task, i) => addTaskElement(task, i));
}

function saveTasks() {
    let taskArrayJson = JSON.stringify(taskArray)
    localStorage.setItem('taskArray', taskArrayJson)
}

document.addEventListener('DOMContentLoaded', onStartUp)