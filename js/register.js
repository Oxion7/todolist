import {User, checkRegexp, setCookie} from "./util.js";

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
    //TODO: fix length and add proper errors
    const nameRegExp = /^[а-яА-Яa-zA-Z]+$/;
    const emailRegExp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s:])(\S){8,16}$/;/*
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
        //get existing data
        const existingUsers = JSON.parse(localStorage.getItem('users'))?? [];
        if (existingUsers.some(user => user.email === email)) {
            document.getElementById('emailError').textContent = 'Пользователь с такой почтой уже существует!';
            return;
        }
        existingUsers.push(user);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        setCookie('currentUser', JSON.stringify({id: user.id, email: user.email}), 1);
        window.location.href = 'todo.html';
    }
})

