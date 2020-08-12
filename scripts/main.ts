interface Task {
    id: string;
    body: string;
    completed: true | false;
    element: HTMLElement;
}
type TaskList = Task[];

let TaskList: TaskList = [];

function setTaskList(newValue: TaskList) {
    newValue = newValue.map((task) => {
        const notExists = TaskList.every((oldTask) => oldTask.id !== task.id);
        if (notExists) {
            task.element.addEventListener("click", (event) => {
                completeTask(task.id);
            });
            task.element.innerHTML = task.body;
            listElement?.appendChild(task.element);
            return task;
        }
        const oldTask = TaskList.find((old) => old.id === task.id);

        if (oldTask?.body !== task.body) {
            task.element.innerHTML = task.body;
        }

        if (oldTask?.completed !== task.completed && task.completed === true) {
            task.element.classList.add("completed");
        }else if(task.completed === false){
            task.element.classList.remove("completed");

        }
        return task;
    });

    TaskList = newValue;
}
function createId() {
    return (Math.random() * 6).toString(36).slice(2, 6);
}
function createTaskElement(id: string): HTMLElement {
    const element = document.createElement("div");
    element.classList.add('task')
    element.id == id;
    return element;
}
function createTask(body: string): Task {
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
function deleteTask(id: string) {
    setTaskList(TaskList.filter((task) => task.id !== id));
}
function completeTask(id: string) {
    console.log(id)
    setTaskList(
        TaskList.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
    );
}

//elements

const formElement = document.getElementById("task-form");
const listElement = document.getElementById("task-list");
const taskInputElement = <HTMLInputElement>(
    document.getElementById("task-input")
);

formElement?.addEventListener("submit", (event) => {
    event.preventDefault();
    const { value } = taskInputElement;
    if (value) {
        createTask(value);

        taskInputElement.value = "";
    }
});
