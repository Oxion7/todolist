import {deleteCookie, getCookie, Todo} from "./util.js";

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(getCookie("currentUser"));
    const existingUsers = JSON.parse(localStorage.getItem('users')) ?? [];
    currentUser = existingUsers.find((user) => user.id === currentUser.id);

    const showTodoFormBtn = document.getElementById('showTodoForm');
    const createModal = document.getElementById('todoFormModal');
    const closeBtn = document.querySelector('.close');
    const todoForm = document.getElementById('todoForm');

    const editModal = document.getElementById('editFormModal');
    const closeEditBtn = document.querySelector('.close-edit');
    const editForm = document.getElementById('editTodoForm');
    const editTodoId = document.getElementById('editTodoId');
    const editTodoTitle = document.getElementById('editTodoTitle');
    const editTodoText = document.getElementById('editTodoText');

    const todoContainer = document.getElementById('todoContainer');

    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', () => {
        deleteCookie('currentUser');
        window.location.href = 'login.html';
    })
    // show create form
    showTodoFormBtn.addEventListener('click', () => {
        createModal.style.display = 'block';
    });
    // close create form
    closeBtn.addEventListener('click', () => {
        createModal.style.display = 'none';
        todoForm.reset();
    });
    closeEditBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
        todoForm.reset();
    })
    window.addEventListener('click', (event) => {
        if (event.target === createModal) {
            createModal.style.display = 'none';
        }
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    // create
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('todoTitle').value.trim();
        const text = document.getElementById('todoText').value.trim();

        if (title && text) {
            Todo.addTodo(new Todo(currentUser.id, title, text));
            createModal.style.display = 'none';
            todoForm.reset();
            displayTodos()
        }
    });
    // edit
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById('editTodoId').value;
        const title = document.getElementById('editTodoTitle').value.trim();
        const text = document.getElementById('editTodoText').value.trim();

        if (id && title && text) {
            Todo.editTodo(id, title, text);
            editModal.style.display = 'none';
            editForm.reset();
            displayTodos();
        }
    })

    function displayTodos() {
        const todos = Todo.getUserTodos(currentUser.id);
        todoContainer.innerHTML = '';

        todos.forEach(todo => {
            const element = document.createElement('div');
            element.className = "todo-item";
            element.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.text}</p>
                <div class="todo-actions">
                    <button class="delete-btn" data-id="${todo.id}">Удалить</button>
                    <button class="change-btn" data-id="${todo.id}">Редактировать</button>
                </div>
            `;
            todoContainer.appendChild(element);
        });
        document.querySelectorAll('.delete-btn').forEach((el) => {
            el.addEventListener('click', (e) => {
                Todo.deleteTodo(e.target.getAttribute('data-id'));
                displayTodos();
            })
        });
        document.querySelectorAll('.change-btn').forEach((el) => {
            el.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const todo = Todo.getUserTodos(currentUser.id).find(t => t.id === id);
                if (todo) {
                    editTodoId.value = todo.id;
                    editTodoTitle.value = todo.title;
                    editTodoText.value = todo.text;
                    editModal.style.display = 'block';
                }
            })
        })
    }

    displayTodos();
})