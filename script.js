// Initialize tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", loadTasks);

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const dueDateInput = document.getElementById("due-date");
    const todoText = todoInput.value.trim();
    const dueDate = dueDateInput.value;

    if (todoText !== "") {
        const task = {
            text: todoText,
            dueDate: dueDate,
            completed: false,
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();

        // Clear inputs after adding
        todoInput.value = "";
        dueDateInput.value = "";
    }
}

function loadTasks() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear current tasks

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.text} (Due: ${task.dueDate})`;
        li.className = task.completed ? 'completed' : '';

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(index);

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.onclick = () => toggleComplete(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(editButton);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function filterTasks(status) {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear current tasks

    tasks.forEach((task, index) => {
        if (status === 'completed' && !task.completed) return;
        if (status === 'pending' && task.completed) return;

        const li = document.createElement("li");
        li.textContent = `${task.text} (Due: ${task.dueDate})`;
        li.className = task.completed ? 'completed' : '';

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(index);

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.onclick = () => toggleComplete(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(editButton);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}
