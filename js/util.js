export class User {
    constructor(firstName, lastName, email, password) {
        this.id = Date.now().toString();//псевдо-рандомный id
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

export class Todo {
    constructor(userId, title, text) {
        this.id = Date.now().toString();
        this.userId = userId;
        this.title = title;
        this.text = text;
    }

    static getUserTodos(userId) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        return todos.filter(todo => todo.userId === userId);
    }

    static addTodo(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static deleteTodo(id) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const filteredTodos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(filteredTodos));
    }

    static editTodo(id, title, text) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const todoIndex = todos.findIndex(t => t.id === id);
        todos[todoIndex].title = title;
        todos[todoIndex].text = text;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

export function setCookie(name, value, expDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}