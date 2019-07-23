'use strict';

const task = {
    todo: [
        {
            text: 'Tarea ejemplo 1',
            checked: 'false'
        }
    ],
    doing: [
        {
            text: 'Tarea ejemplo 2',
            checked: 'false'
        },
        {
            text: 'Tarea ejemplo 3',
            checked: 'false'
        }
    ],
    done: [
        {
            text: 'Tarea ejemplo 4',
            checked: 'true'
        },
    ],
};

let taskDoing = task.doing;
let taskTodo = task.todo;
let taskDone = task.done;

// Paint all the example arrays

const todoSection = document.querySelector('.todo-section');
const doingSection = document.querySelector('.doing-section');
const doneSection = document.querySelector('.done-section');
const addTaskSection = document.querySelector('.add-task-hidden');
const buttonFooter = document.querySelector('.footer__button');
const buttonModal = document.querySelector('.modal__button');
const inputModal = document.getElementById('modal__new-task');
const dateParagraph = document.querySelector('.actual-date');

const dateContent = document.createTextNode(getActualDate());
dateParagraph.appendChild(dateContent);

buttonFooter.addEventListener('click', handleFooterButton);
buttonModal.addEventListener('click', handleModalButton);

function getActualDate() {
    let f = new Date();
    return (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
};

taskTodo.forEach(item =>
    paintTasks(todoSection, item.text, 'todo-section__label', item.checked)
);
taskDoing.forEach(item =>
    paintTasks(doingSection, item.text, 'doing-section__label', item.checked)
)
taskDone.forEach(item =>
    paintTasks(doneSection, item.text, 'done-section__label', item.checked)
)

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

function getListeners() {
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

getListeners();

// First functionality: task completed checked pushed to the end of the list (html section "done")

function completeTaskDoing(event) {

    const eventText = event.currentTarget.innerText;
    const itemChecked = 'true';
    const newtaskDoing = taskDoing.filter(item => item.text !== eventText);
    taskDoing = newtaskDoing;

    pushTasks(eventText, taskDone, 'true');
    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    event.currentTarget.classList.add('hidden');
    getListeners();
}

function completeTaskTodo(event) {

    const eventText = event.currentTarget.innerText;
    const itemChecked = 'true';

    pushTasks(eventText, taskDone, 'true');
    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);
    event.currentTarget.classList.add('hidden');
    taskTodo = [];

    getListeners();
}

function pushTasks(taskText, taskArray, checked) {

    const eventTaskObject = {
        text: taskText,
        checked: checked
    }
    taskArray.push(eventTaskObject);
    console.log(taskArray);
}

// SECOND functionality: deselect task completed and push to the start of the list (html section "todo")

function deselectTaskDone(event) {

    if (taskTodo[0]) {
        const allTodoSectionLabel = document.querySelectorAll('.todo-section__label');
        console.log(allTodoSectionLabel)
        allTodoSectionLabel.forEach(item =>
            item.classList.add('hidden')
        );
        paintTasks(doingSection, taskTodo[0].text, 'doing-section__label', taskTodo[0].checked);
        pushTasks(taskTodo[0].text, taskDoing, 'false');
        console.log('taskDoing', taskDoing);

        taskTodo = [];
    };

    pushTasks(event.currentTarget.innerText, taskTodo, 'false');
    paintTasks(todoSection, taskTodo[0].text, 'todo-section__label', taskTodo[0].checked);
    event.currentTarget.classList.add('hidden');

    getListeners();
}

// THIRD functionality: add modal to add new task (section hidden, to see it add class 'add-task-opened')

function handleFooterButton() {
    addTaskSection.classList.add('add-task-opened');
}

function handleModalButton() {
    console.log(taskTodo);
    if (taskTodo[0]) {
        const allTodoSectionLabel = document.querySelectorAll('.todo-section__label');
        console.log(allTodoSectionLabel)
        allTodoSectionLabel.forEach(item =>
            item.classList.add('hidden')
        );
        paintTasks(doingSection, taskTodo[0].text, 'doing-section__label', taskTodo[0].checked);
        pushTasks(taskTodo[0].text, taskDoing, 'false');
        console.log('taskDoing', taskDoing);

        taskTodo = [];
    };
    pushTasks(inputModal.value, taskTodo, 'false');
    console.log('taskTodo', taskTodo[0].text);

    paintTasks(todoSection, taskTodo[0].text, 'todo-section__label', taskTodo[0].checked);
    addTaskSection.classList.remove('add-task-opened');
    getListeners();
};


// generic function to change label text on todo
// function paintingLabelNode(text, section) {

//     let newTextnode = document.createTextNode(text);
//     actualTextnode = section.lastChild;
//     section.replaceChild(newTextnode, actualTextnode);
// }
// execute funtcion to change example label todoSection with example array task.done[0].text
// paintingLabelNode(task.done[0].text, todoSectionLabel);

