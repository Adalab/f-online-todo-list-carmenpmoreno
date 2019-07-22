'use strict';

const task = {
    todo: [
        {
            text: "Tarea ejemplo array.todo",
            checked: "false"
        }
    ],
    doing: [
        {
            text: "Tarea ejemplo array.doig",
            checked: "false"
        },
    ],
    done: [
        {
            text: "Tarea ejemplo array.done",
            checked: "true"
        }
    ],
};

const taskDoing = task.doing;
let taskTodo = task.todo;
const taskDone = task.done;

// Paint all the example arrays

const todoSection = document.querySelector('.todo-section');
const doingSection = document.querySelector('.doing-section');
const doneSection = document.querySelector('.done-section');

paintTasks(todoSection, taskTodo[0].text, 'todo-section__label', taskTodo[0].checked);
paintTasks(doingSection, taskDoing[0].text, 'doing-section__label', taskDoing[0].checked);
paintTasks(doneSection, taskDone[0].text, 'done-section__label', taskDone[0].checked);

const allDoingSectionLabel = document.querySelectorAll('.doing-section__label');
const allTodoSectionLabel = document.querySelectorAll('.todo-section__label');

for (const doingSectionLabel of allDoingSectionLabel) {
    doingSectionLabel.addEventListener('change', completeTaskDoing);
};
for (const todoSectionLabel of allTodoSectionLabel) {
    todoSectionLabel.addEventListener('change', completeTaskTodo);
};

// First functionality: task completed checked pushed to the end of the list (html section "done")

function completeTaskDoing(event) {
    const eventText = event.currentTarget.innerText;

    pushTasks(eventText, taskDone);
    const itemChecked = true;
    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    event.currentTarget.classList.add('hidden');

    filterTaskArrays(taskDoing, doingSection, 'doing-section__label', eventText);

}
function completeTaskTodo(event) {
    console.log('función completeTaskTodo');

    const eventText = event.currentTarget.innerText;
    const itemChecked = true

    pushTasks(event.currentTarget.innerText, taskDone);
    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    event.currentTarget.classList.add('hidden');
    filterTaskArrays(taskTodo, todoSection, 'todo-section__label', eventText);
}

function pushTasks(taskText, taskArray) {
    const eventTaskObject = {
        text: taskText,
        checked: 'true'
    }
    taskArray.push(eventTaskObject);
    console.log(taskArray);
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

    if (checked === true) {
        inputSelector.checked = true;
    } else {
        inputSelector.checked = false;
    };
}

function filterTaskArrays(arrayTask, eventText) {
    const taskFiltered = arrayTask
        .filter(item => item.text !== eventText);
    console.log('taskFiltered', taskFiltered);
}

// SECOND functionality: deselect task completed and push to the start of the list (html section "todo")

// const newAllDoneSectionLabel = document.querySelectorAll('.done-section__label');

// for (const newDoneSectionLabel of newAllDoneSectionLabel) {
//     newDoneSectionLabel.addEventListener('click', deselectTaskDone);
// };

// function deselectTaskDone(event) {
//     console.log('función deselectTaskDone');

//     const eventText = event.currentTarget.innerText;
//     const itemChecked = false;

//     paintTasks(doingSection, taskTodo[0].text, 'doing-section__label', itemChecked);
//     pushTasks(taskTodo[0].text, taskDoing);
//     console.log('taskDoing', taskDoing);

//     taskTodo = [];
//     console.log('taskTodo', taskTodo);
//     pushTasks(event.currentTarget.innerText, taskTodo);

//     paintTasks(todoSection, eventText, 'todo-section__label', itemChecked);

//     event.currentTarget.classList.add('hidden');
//     filterTaskArrays(taskTodo, todoSection, 'todo-section__label', eventText);

// }

// generic function to change label text on todo
// function paintingLabelNode(text, section) {

//     let newTextnode = document.createTextNode(text);
//     actualTextnode = section.lastChild;
//     section.replaceChild(newTextnode, actualTextnode);
// }
// execute funtcion to change example label todoSection with example array task.done[0].text
// paintingLabelNode(task.done[0].text, todoSectionLabel);
