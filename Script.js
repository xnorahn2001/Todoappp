const addButton = document.getElementById('add-btn');
const taskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');
const todoCounter = document.getElementById('todo-counter');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');  // New search button
let todoCount = 0;
addButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTodo(taskText);
        clearInput(taskInput);
    } else {
        alert('Please enter a task!');
    }
});
function addTodo(taskText) {
    const listItem = createTodoElement(taskText);
    todoList.appendChild(listItem);
    updateTodoCounter(1);
    saveTodosToLocalStorage();
}
function createTodoElement(taskText) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    const taskNode = document.createElement('span');
    taskNode.textContent = taskText;
    const checkbox = createCheckbox(taskNode);
    const editButton = createEditButton(taskNode);
    const deleteButton = createDeleteButton(listItem);
    listItem.appendChild(checkbox);
    listItem.appendChild(taskNode);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}
function createCheckbox(taskNode) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        taskNode.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    });
    return checkbox;
}
function createEditButton(taskNode) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        const newTaskText = prompt('Edit your task:', taskNode.textContent);
        if (newTaskText) {
            taskNode.textContent = newTaskText.trim();
            saveTodosToLocalStorage();
        }
    });
    return editButton;
}
function createDeleteButton(listItem) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        todoList.removeChild(listItem);
        updateTodoCounter(-1);
        saveTodosToLocalStorage();
    });
    return deleteButton;
}
function clearInput(inputElement) {
    inputElement.value = '';
}
function updateTodoCounter(change) {
    todoCount += change;
    todoCounter.textContent = `Total Todos: ${todoCount}`;
}
function saveTodosToLocalStorage() {
    const todos = Array.from(document.querySelectorAll('.todo-item span')).map(item => item.textContent);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodosFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(taskText => addTodo(taskText));
}
function searchTodos() {
    const searchTerm = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.todo-item');
    items.forEach(item => {
        const taskText = item.querySelector('span').textContent.toLowerCase();
        item.style.display = taskText.includes(searchTerm) ? 'block' : 'none';
    });
}

searchButton.addEventListener('click', searchTodos);

window.onload = loadTodosFromLocalStorage;
