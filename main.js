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
    console.log('función completeTaskDoing');
    const eventText = event.currentTarget.innerText;
    const itemChecked = 'true';

    pushTasks(eventText, taskDone);
    taskDone.forEach(item =>
        item.checked = true
    );

    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    const newtaskDoing = taskDoing.filter(item => item.text !== eventText);
    console.log(newtaskDoing);
    taskDoing = newtaskDoing;

    event.currentTarget.classList.add('hidden');

    getListeners();
}

function completeTaskTodo(event) {
    console.log('función completeTaskTodo');
    const eventText = event.currentTarget.innerText;
    const itemChecked = 'true';

    event.currentTarget.classList.add('hidden');
    // filterTaskArrays(taskTodo, todoSection, 'todo-section__label', eventText);
    taskTodo = [];
    console.log('taskTodo: ', taskTodo);

    pushTasks(eventText, taskDone);
    taskDone.forEach(item =>
        item.checked = true
    );

    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    getListeners();
}

function pushTasks(taskText, taskArray) {
    const eventTaskObject = {
        text: taskText,
        checked: 'true'
    }
    taskArray.push(eventTaskObject);
    console.log(taskArray);
}

// SECOND functionality: deselect task completed and push to the start of the list (html section "todo")

function deselectTaskDone(event) {
    console.log('función deselectTaskDone');

    if (!taskTodo[0]) {
        console.log('no había nada en todo');
    
        pushTasks(event.currentTarget.innerText, taskTodo);
        taskTodo[0].checked = false;
        console.log('taskTodo', taskTodo[0].text);
    
        paintTasks(todoSection, taskTodo[0].text, 'todo-section__label', taskTodo[0].checked);
        event.currentTarget.classList.add('hidden');
    
        getListeners();
    } else {
        const allTodoSectionLabel = document.querySelectorAll('.todo-section__label');
        console.log(allTodoSectionLabel)
        allTodoSectionLabel.forEach(item =>
            item.classList.add('hidden')
        );
        paintTasks(doingSection, taskTodo[0].text, 'doing-section__label', taskTodo[0].checked);
        pushTasks(taskTodo[0].text, taskDoing);
        console.log('taskDoing', taskDoing);
    
        taskTodo = [];
    
        pushTasks(event.currentTarget.innerText, taskTodo);
        taskTodo[0].checked = false;
        console.log('taskTodo', taskTodo[0].text);
    
        paintTasks(todoSection, taskTodo[0].text, 'todo-section__label', taskTodo[0].checked);
        event.currentTarget.classList.add('hidden');
    
        getListeners();
    }
}

// Third functionality: add modal to add new task (section hidden, to see it add class 'add-task')

// listener on button

// handler

    // add class 'add-task' to section hidden


    
// generic function to change label text on todo
// function paintingLabelNode(text, section) {

//     let newTextnode = document.createTextNode(text);
//     actualTextnode = section.lastChild;
//     section.replaceChild(newTextnode, actualTextnode);
// }
// execute funtcion to change example label todoSection with example array task.done[0].text
// paintingLabelNode(task.done[0].text, todoSectionLabel);

