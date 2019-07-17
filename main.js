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

const doneSectionLabel = document.querySelector('.done-section__label');

function paintingLabelNode(task) {
    let newTextnode = document.createTextNode(task);
    actualTextnode = doneSectionLabel.lastChild;
    doneSectionLabel.replaceChild(newTextnode, actualTextnode);
}

paintingLabelNode(task.done[0].text);