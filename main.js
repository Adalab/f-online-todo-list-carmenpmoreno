'use strict';

const todoSection = document.querySelector('.todo-section');
const doingSection = document.querySelector('.doing-section');
const doneSection = document.querySelector('.done-section');
const addTaskSection = document.querySelector('.add-task-hidden');
const buttonFooter = document.querySelector('.footer__button');
const buttonModal = document.querySelector('.modal__button');
const inputModal = document.getElementById('modal__new-task');
const dateParagraph = document.querySelector('.actual-date');

let taskDoing = [];
let taskTodo = [];
let taskDone = [];
let taskTodoToLs = JSON.parse(localStorage.getItem('taskTodoToLs'));
let taskDoingToLs = JSON.parse(localStorage.getItem('taskDoingToLs'));
let taskDoneToLs = JSON.parse(localStorage.getItem('taskDoneToLs'));

// paint tasks from LocalStorage, if them exists

if (taskTodoToLs === null) {
    console.log('no hay nada en ls')
} else {
    taskTodo = taskTodoToLs
    taskTodo.forEach(item =>
        paintTasks(todoSection, item.text, 'todo-section__label', item.checked)
    );
}

if (taskDoingToLs === null) {
    console.log('no hay nada en ls')
} else {
    taskDoing = taskDoingToLs;
    taskDoing.forEach(item =>
        paintTasks(doingSection, item.text, 'doing-section__label', item.checked)
    );
}
if (taskDoneToLs === null) {
    console.log('no hay nada en ls')
} else {
    taskDone = taskDoneToLs;
    taskDone.forEach(item =>
        paintTasks(doneSection, item.text, 'done-section__label', item.checked)
    );
}

function paintTasks(section, node, labelClass, checked) {

    const labelSelector = document.createElement('label');
    const inputSelector = document.createElement('input');
    const labelContent = document.createTextNode(node);

    labelSelector.appendChild(inputSelector);
    labelSelector.appendChild(labelContent);
    labelSelector.classList.add(labelClass);
    inputSelector.setAttribute('type', 'checkbox');

    section.appendChild(labelSelector);

    if (checked === 'true') {
        inputSelector.checked = true;
    } else {
        inputSelector.checked = false;
    };
}

buttonFooter.addEventListener('click', handleFooterButton);
buttonModal.addEventListener('click', handleModalButton);

function paintActualDate() {
    const dateContent = document.createTextNode(getActualDate());
    dateParagraph.appendChild(dateContent);
}
paintActualDate();

function getActualDate() {
    let f = new Date();
    return (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
};

function getTasksListeners() {
    const allDoingSectionLabel = document.querySelectorAll('.doing-section__label');
    const allTodoSectionLabel = document.querySelectorAll('.todo-section__label');
    const newAllDoneSectionLabel = document.querySelectorAll('.done-section__label');


    for (const newDoneSectionLabel of newAllDoneSectionLabel) {
        newDoneSectionLabel.addEventListener('change', deselectTaskDone);
    };

    for (const doingSectionLabel of allDoingSectionLabel) {
        doingSectionLabel.addEventListener('change', completeTaskDoing);
    };
    for (const todoSectionLabel of allTodoSectionLabel) {
        todoSectionLabel.addEventListener('change', completeTaskTodo);
    };
}

getTasksListeners();

// First functionality: task completed checked pushed to the end of the list (html section "done")

function completeTaskDoing(event) {

    const eventText = event.currentTarget.innerText;
    const itemChecked = 'true';

    if (taskDoing.find(item => item.text === eventText)) {
        console.log('he encontrado un texto igual en el array')
        const taskDoingToLs = taskDoing.filter(item => item.text !== eventText);
        taskDoing = taskDoingToLs;
        localStorage.setItem('taskDoingToLs', JSON.stringify(taskDoingToLs));
    };

    if (!taskDone.find(item => item.text === eventText)) {
        pushTasks(eventText, taskDone, 'true');
        localStorage.setItem('taskDoneToLs', JSON.stringify(taskDone));
    };

    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    event.currentTarget.classList.add('hidden');
    getTasksListeners();
}

function completeTaskTodo(event) {

    const eventText = event.currentTarget.innerText;
    const itemChecked = 'true';

    taskTodo = [];
    localStorage.setItem('taskTodoToLs', JSON.stringify(taskTodo));

    if (!taskDone.find(item => item.text === eventText)) {
        pushTasks(eventText, taskDone, 'true');
        localStorage.setItem('taskDoneToLs', JSON.stringify(taskDone));
    };

    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);
    event.currentTarget.classList.add('hidden');

    getTasksListeners();
}

function pushTasks(taskText, taskArray, checked) {

    const eventTaskObject = {
        text: taskText,
        checked: checked
    }
    taskArray.push(eventTaskObject);
}

// SECOND functionality: deselect task completed and push to the start of the list (html section "todo")

function deselectTaskDone(event) {
    const eventText = event.currentTarget.innerText;
    const taskDoneToLs = taskDone.filter(item => item.text !== eventText);
    taskDone = taskDoneToLs;
    localStorage.setItem('taskDoneToLs', JSON.stringify(taskDoneToLs));

    if (taskTodo[0]) {
        paintAndKeepTodoOnDoing();
    };

    pushTasks(event.currentTarget.innerText, taskTodo, 'false');
    localStorage.setItem('taskTodoToLs', JSON.stringify(taskTodo));

    paintTasks(todoSection, taskTodo[0].text, 'todo-section__label', taskTodo[0].checked);
    event.currentTarget.classList.add('hidden');

    getTasksListeners();
}

// THIRD functionality: add modal to add new task (section hidden, to see it add class 'add-task-opened')

function handleFooterButton() {
    addTaskSection.classList.add('add-task-opened');
}

function handleModalButton() {
    console.log(taskDoing);
    if (taskTodo[0]) {
        paintAndKeepTodoOnDoing();
    };
    pushTasks(inputModal.value, taskTodo, 'false');
    localStorage.setItem('taskTodoToLs', JSON.stringify(taskTodo));

    paintTasks(todoSection, taskTodo[0].text, 'todo-section__label', taskTodo[0].checked);
    addTaskSection.classList.remove('add-task-opened');
    getTasksListeners();
};

function paintAndKeepTodoOnDoing() {
    const allTodoSectionLabel = document.querySelectorAll('.todo-section__label');
    allTodoSectionLabel.forEach(item =>
        item.classList.add('hidden')
    );
    paintTasks(doingSection, taskTodo[0].text, 'doing-section__label', taskTodo[0].checked);
    pushTasks(taskTodo[0].text, taskDoing, 'false');
    localStorage.setItem('taskDoingToLs', JSON.stringify(taskDoing));

    taskTodo = [];
    localStorage.setItem('taskTodoToLs', JSON.stringify(taskTodo));
}

