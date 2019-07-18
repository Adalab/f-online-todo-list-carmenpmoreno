const task = {
    todo: [
        {
            text: "Tarea TODO ejemplo"
        }
    ],
    doing: [
        {
            text: "Tarea DOING ejemplo"
        }
    ],
    done: [
        {
            text: "Tarea DONE ejemplo"
        }
    ],
};

const todoSectionLabel = document.querySelector('.todo-section__label');
const doneSectionLabel = document.querySelector('.done-section__label');


function paintingLabelNode(task, section) {
    let newTextnode = document.createTextNode(task);
    actualTextnode = section.lastChild;
    section.replaceChild(newTextnode, actualTextnode);
}

paintingLabelNode(task.done[0].text, todoSectionLabel);