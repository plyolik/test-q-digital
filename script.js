let taskArray = []

const taskInput = document.querySelector('.input');
const addTaskBtn = document.querySelector('.btn-add-task')
const removeAllTaskBtn = document.querySelector('.btn-remove-all')
const readyAllTaskBtn = document.querySelector('.btn-ready-all')
const taskListDiv = document.querySelector('.task-list')

function addTaskElement(value, index) {
    let status = 'READY';
    let statusColor = 'task-status_unready'

    if (value.status) {
        status = 'UNREADY'
        statusColor = 'task-status_ready'
    }

    let element = `
        <div class="task-container">
            <div class="task-content">
                <p class="task-title">${value.task}</p>
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
    
    const btnStatus = div.querySelector('.btn-status')
    const btnDelete = div.querySelector('.btn-delete')

    btnDelete.onclick = ()=> {
        taskListDiv.removeChild(div)
        taskArray.splice(index, 1)
        saveTasks()
    }

    btnStatus.addEventListener('click', ()=> {
        value.status = !value.status

        status = 'READY';
        statusColor = 'task-status_unready'

        if (value.status) {
            status = 'UNREADY'
            statusColor = 'task-status_ready'
        }

        btnStatus.textContent = status
        div.querySelector('.task-status').className = `task-status ${statusColor}`
        saveTasks()
    })
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

addTaskBtn.addEventListener('click', addTask)

function removeAllTasks() {
    if (taskArray.length !== 0) {
        taskArray = []
        taskListDiv.innerHTML = ''
        localStorage.clear()
    }

}

removeAllTaskBtn.addEventListener('click', removeAllTasks)

function readyAllTasks() {
    taskListDiv.innerHTML = ''
    taskArray.forEach((element, i) => {
        element.status = true
        addTaskElement(element, i)
    })
    saveTasks()
}

readyAllTaskBtn.addEventListener('click', readyAllTasks)

function onStartUp() {
    let todoString = localStorage.getItem('todo')
    if (!todoString) 
        return
    taskArray = JSON.parse(todoString)
    taskArray.forEach((element, i) => {
        addTaskElement(element, i)
    });
}

function saveTasks() {
    let todoString = JSON.stringify(taskArray)
    localStorage.setItem('todo', todoString)
}

document.addEventListener('DOMContentLoaded', onStartUp)