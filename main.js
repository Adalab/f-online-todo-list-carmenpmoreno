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
const todoSection = document.querySelector('.todo-section');
const doingSection = document.querySelector('.doing-section');
const doneSection = document.querySelector('.done-section');

const todoSectionLabel = document.querySelector('.todo-section__label');
const doingSectionLabel = document.querySelector('.doing-section__label');
const doneSectionLabel = document.querySelector('.done-section__label');

const taskDoing = task.doing;
const taskTodo = task.todo;
const taskDone = task.done;

// First functionality: task completed checked pushed to the end od the list (html section "done")
doingSectionLabel.addEventListener('click', completeTaskDoing);
todoSectionLabel.addEventListener('click', completeTaskTodo);

function completeTaskDoing(event) {

    const eventText = event.currentTarget.innerText;

    pushDoneTasks(event.currentTarget.innerText);
    itemChecked = true
    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    event.currentTarget.classList.add('hidden');
    // probando a sustituir label de sección en vez de ocultar ....
    // console.dir(doingSection.innerText);
    // paintingLabelNode(eventText, doingSection);

    filterandPaintTaskArrays(taskDoing, doingSection, 'doing-section__label', eventText);

}
function completeTaskTodo(event) {

    const eventText = event.currentTarget.innerText;

    pushDoneTasks(event.currentTarget.innerText);
    itemChecked = true
    paintTasks(doneSection, eventText, 'done-section__label', itemChecked);

    event.currentTarget.classList.add('hidden');
    filterandPaintTaskArrays(taskTodo, todoSection, 'todo-section__label', eventText);
}

// generic function to change label text
function paintingLabelNode(text, section) {

    let newTextnode = document.createTextNode(text);
    actualTextnode = section.lastChild;
    section.replaceChild(newTextnode, actualTextnode);
}

// función que filtra arrays task doing y todo y los pinta de nuevo
function filterandPaintTaskArrays(arrayTask, section, labelClass, eventText) {
    const taskFiltered = arrayTask
        .filter(item => item.text !== eventText);
    console.log(taskFiltered);
    taskFiltered.map(item => {
        paintTasks(section, item.text, labelClass);
    })
}

// función que pinta tasks en un un label/input de la sección indicada, con el atributo checked a true si se indica
function paintTasks(section, node, labelClass, itemChecked) {

    const labelSelector = document.createElement('label');
    const inputSelector = document.createElement('input');
    const labelContent = document.createTextNode(node);

    labelSelector.appendChild(inputSelector);
    labelSelector.appendChild(labelContent);
    labelSelector.classList.add(labelClass);
    inputSelector.setAttribute('type', 'checkbox');

    section.appendChild(labelSelector);

    if (itemChecked === true) {
        inputSelector.checked = true;
    } else {
        inputSelector.checked = false;
    };
}

// función que pushea tasks al array "done"
function pushDoneTasks(taskText) {
    const eventTaskObject = {
        text: taskText,
        checked: "true"
    }

    taskDone.push(eventTaskObject);
    console.log(taskDone);
}

// SECOND functionality

// execute fucntion to change example label todoSection with example array task.done[0].text
// paintingLabelNode(task.done[0].text, todoSectionLabel);