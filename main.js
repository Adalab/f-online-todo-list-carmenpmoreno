const task = {
    todo: [
        // {
        //     text: "Tarea ejemplo 1",
        //     checked: "false"
        // },
        // {
        //     text: "Tarea ejemplo array.todo",
        //     checked: "false"
        // }
    ],
    doing: [
        // {
        //     text: "Tarea ejemplo 2",
        //     checked: "false"
        // },
        // {
        //     text: "Tarea ejemplo array.doig",
        //     checked: "false"
        // },

    ],
    done: [
        // {
        //     text: "Tarea ejemplo array.done",
        //     checked: "true"
        // }
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
    console.log(taskDone)
    pushAndPaintDoneTasks(event.currentTarget.innerText);

    event.currentTarget.classList.add('hidden');
    filterTaskArrays(taskDoing, doingSection, 'doing-section__label', eventText);

}
function completeTaskTodo(event) {

    const eventText = event.currentTarget.innerText;

    pushAndPaintDoneTasks(event.currentTarget.innerText);

    event.currentTarget.classList.add('hidden');
    filterTaskArrays(taskTodo, todoSection, 'todo-section__label', eventText);
}


// función que pushea tasks al array "todo" y lo pinta
function pushAndPaintDoneTasks(taskText) {
    const eventTaskObject = {
        text: taskText,
        checked: "true"
    }

    taskDone.push(eventTaskObject);
    console.log(taskDone);
    taskDone.map(item => {
        paintTasks(doneSection, item.text, 'done-section__label', item.checked);
    })
}

// función que filtra arrays task doing y todo y los pinta de nuevo
function filterTaskArrays(arrayTask, section, labelClass, eventText) {
    const taskFiltered = arrayTask
        .filter(item => item.text !== eventText);
    console.log(taskFiltered);
    // taskFiltered.map(item => {
    //     paintTasks(section, item.text, labelClass);
    // })
}

// función que sustituye los label con arrays dentro de task
function paintTasks(section, node, labelClass, itemChecked) {
    // detectando hijos actuales de sección para poder sustituirlos
    console.dir(section);
    const currentContent = section.children;
    console.log(currentContent);
    // ..................

    const labelSelector = document.createElement('label');
    const inputSelector = document.createElement('input');
    const labelContent = document.createTextNode(node);

    labelSelector.appendChild(inputSelector);
    labelSelector.appendChild(labelContent);
    labelSelector.classList.add(labelClass);
    inputSelector.setAttribute('type', 'checkbox');

    // section.appendChild(labelSelector);

    // detectando hijos actuales de sección para poder sustituirlos
    section.replaceChild(currentContent, labelSelector);
    // ..................

    if (itemChecked = true) {
        inputSelector.checked = true;
    };
}

// SECOND functionality

// generic function to change label text
function paintingLabelNode(task, section) {
    let newTextnode = document.createTextNode(task);
    actualTextnode = section.lastChild;
    section.replaceChild(newTextnode, actualTextnode);
}
// execute fucntion to change example label todoSection with example array task.done[0].text
// paintingLabelNode(task.done[0].text, todoSectionLabel);