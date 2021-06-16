let arrayTask = []

const task = document.querySelector('.input');
const submit = document.querySelector('.btn-add-task')
const content = document.querySelector('.content')
const btnRemoveAllTask = document.querySelector('.btn-remove-all')
const btnReadyAllTask = document.querySelector('.btn-ready-all')
const taskList = document.querySelector('.task-list')


function addArrayTask() {
    let currentTask = task.value
    if (task.value !== '') {
        let obj = {
            task: currentTask,
            status: false
        }
        arrayTask.push(obj)
        createTaskList(obj, arrayTask.indexOf(obj))
    } 
    saveArrayTask()
}

function createTaskList(value, index) {
    let status = 'READY';
    let statusColor = 'unready'

    if (value.status) {
        status = 'UNREADY'
        statusColor = 'ready'
    }

    let element = `
        <div class="task-container">
            <div>
                <p>${value.task}</p>
                <div class="container-btn">
                    <button class="btn btn-status">${status}</botton>
                    <button class="btn btn-delete">DELETE</botton>
                </div>
            </div>
            <div class="task-status ${statusColor}"></div>
        </div>
        <div class="liner"></div>
    `

    const div = document.createElement('div')
    div.setAttribute('data-index', `${index}`)
    taskList.appendChild(div)
    div.innerHTML = element
    
    const btnStatus = div.querySelector('.btn-status')
    const btnDelete = div.querySelector('.btn-delete')

    btnDelete.onclick = ()=> {
        taskList.removeChild(div)
        arrayTask.splice(index, 1)
        saveArrayTask()
    }

    btnStatus.addEventListener('click', ()=> {
        value.status = !value.status

        status = 'READY';
        statusColor = 'unready'

        if (value.status) {
            status = 'UNREADY'
            statusColor = 'ready'
        }

        btnStatus.textContent = status
        div.querySelector('.task-status').className = `task-status ${statusColor}`
        saveArrayTask()
    })
}

function clearForm() {
    task.value = ''    
}

function startWork() {
    addArrayTask()
    clearForm()
}

submit.addEventListener('click', startWork)

function removeAllTask() {
    if (arrayTask.length !== 0) {
        arrayTask = []
        taskList.innerHTML = ''
        localStorage.clear()
    }

}

btnRemoveAllTask.addEventListener('click', removeAllTask)

function readyAllTask() {
    taskList.innerHTML = ''
    arrayTask.forEach((element, i) => {
        element.status = true
        createTaskList(element, i)
    })
    saveArrayTask()
}

btnReadyAllTask.addEventListener('click', readyAllTask)

function onStartUp() {
    let todoString = localStorage.getItem('todo')
    if (!todoString) 
        return
    arrayTask = JSON.parse(todoString)
    arrayTask.forEach((element, i) => {
        createTaskList(element, i)
    });
}

function saveArrayTask() {
    let todoString = JSON.stringify(arrayTask)
    localStorage.setItem('todo', todoString)
}

document.addEventListener('DOMContentLoaded', onStartUp)


