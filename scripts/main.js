"use strict";
let TaskList = [];
function setTaskList(newValue) {
    newValue = newValue.map((task) => {
        const notExists = TaskList.every((oldTask) => oldTask.id !== task.id);
        if (notExists) {
            task.element.addEventListener("click", (event) => {
                completeTask(task.id);
            });
            task.element.innerHTML = task.body;
            listElement === null || listElement === void 0 ? void 0 : listElement.appendChild(task.element);
            return task;
        }
        const oldTask = TaskList.find((old) => old.id === task.id);
        if ((oldTask === null || oldTask === void 0 ? void 0 : oldTask.body) !== task.body) {
            task.element.innerHTML = task.body;
        }
        if ((oldTask === null || oldTask === void 0 ? void 0 : oldTask.completed) !== task.completed && task.completed === true) {
            task.element.classList.add("completed");
        }
        else if (task.completed === false) {
            task.element.classList.remove("completed");
        }
        return task;
    });
    TaskList = newValue;
}
function createId() {
    return (Math.random() * 6).toString(36).slice(2, 6);
}
function createTaskElement(id) {
    const element = document.createElement("div");
    element.classList.add('task');
    element.id == id;
    return element;
}
function createTask(body) {
    const id = createId();
    const element = createTaskElement(id);
    const newTask = {
        id,
        body,
        element,
        completed: false,
    };
    setTaskList([...TaskList, newTask]);
    return newTask;
}
function deleteTask(id) {
    setTaskList(TaskList.filter((task) => task.id !== id));
}
function completeTask(id) {
    console.log(id);
    setTaskList(TaskList.map((task) => task.id === id ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task));
}
//elements
const formElement = document.getElementById("task-form");
const listElement = document.getElementById("task-list");
const taskInputElement = (document.getElementById("task-input"));
formElement === null || formElement === void 0 ? void 0 : formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const { value } = taskInputElement;
    if (value) {
        createTask(value);
        taskInputElement.value = "";
    }
});
