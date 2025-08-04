class User {
    constructor(firstName, lastName, email, password) {
        this.id = Date.now().toString();//псевдо-рандомный id
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

class ToDoList {
    constructor(userId) {
        this.userId = userId;
        this.todos = [];
    }
}

document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    //clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    //get values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    //regex
    const nameRegExp = /^[а-яА-Яa-zA-Z]+$/;
    const emailRegExp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])(\S){8,16}$/;/*
    1 number (0-9)
    1 uppercase letters
    1 lowercase letters
    1 non-alpha numeric number
    8-16 characters
    */
    if (checkRegexp(nameRegExp, 'Неправильное имя!', firstName, 'firstNameError') &&
        checkRegexp(nameRegExp, 'Неправильная фамилия!', lastName, 'lastNameError') &&
        checkRegexp(emailRegExp, 'Неправильный email!', email, 'emailNameError') &&
        checkRegexp(passwordRegExp, 'Неправильный пароль', password, 'passwordNameError')
    ) {
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Пароли не совпадают!';
            return;
        }
        const user = new User(firstName, lastName, email, password);
        const toDoList = new ToDoList(user.id);
        //get existing data
        const existingUsers = JSON.parse(localStorage.getItem('users'))?? [];
        const existingTodos = JSON.parse(localStorage.getItem('todos'))?? [];
        if (existingUsers.some(user => user.email === email)) {
            document.getElementById('emailError').textContent = 'Пользователь с такой почтой уже существует!';
            return;
        }
        existingUsers.push(user);
        existingTodos.push(toDoList);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('todos', JSON.stringify(existingTodos));
    }
})

function checkRegexp(regexp, text, value, errorElement) {
    if (regexp.test(value)) {
        return true;
    }
    document.getElementById(errorElement).textContent = text;
    return false;
}