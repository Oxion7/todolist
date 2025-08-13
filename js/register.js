import {User, setCookie} from "./util.js";

document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    //clear error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    let isValid = true;
    //regex
    const nameRegExp = /^[а-яА-Яa-zA-Z-]+$/;
    const emailRegExp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s:])(\S){8,16}$/;/*
    1 number (0-9)
    1 uppercase letters
    1 lowercase letters
    1 non-alpha numeric number
    8-16 characters
    */
    // first name
    if (!firstName) {
        document.getElementById('firstNameError').textContent = 'Поле имени обязательно для заполнения';
        isValid = false;
    } else if (!nameRegExp.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'Имя может содержать только буквы (русские или английские)';
        isValid = false;
    } else if (firstName.length < 2 || firstName.length > 30) {
        document.getElementById('firstNameError').textContent = 'Имя должно быть от 2 до 30 символов';
        isValid = false;
    }

    //  last name
    if (!lastName) {
        document.getElementById('lastNameError').textContent = 'Поле фамилии обязательно для заполнения';
        isValid = false;
    } else if (!nameRegExp.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Фамилия может содержать только буквы (русские или английские)';
        isValid = false;
    } else if (lastName.length < 2 || lastName.length > 30) {
        document.getElementById('lastNameError').textContent = 'Фамилия должна быть от 2 до 30 символов';
        isValid = false;
    }

    // email
    if (!email) {
        document.getElementById('emailError').textContent = 'Поле email обязательно для заполнения';
        isValid = false;
    } else if (!emailRegExp.test(email)) {
        document.getElementById('emailError').textContent = 'Введите корректный email (например: example@domain.com)';
        isValid = false;
    }

    // password
    if (!password) {
        document.getElementById('passwordError').textContent = 'Поле пароля обязательно для заполнения';
        isValid = false;
    } else if (!passwordRegExp.test(password)) {
        document.getElementById('passwordError').textContent = 'Пароль должен содержать: 8-16 символов, минимум 1 цифру, 1 заглавную букву, 1 строчную букву и 1 специальный символ';
        isValid = false;
    } else if (password.length < 8 || password.length > 16) {
        document.getElementById('passwordError').textContent = 'Длина пароля должна быть от 8 до 16 символов';
        isValid = false;
    }

    // confirm password
    if (!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Пожалуйста, подтвердите пароль';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Пароли не совпадают';
        isValid = false;
    }
    if (isValid) {

        const user = new User(firstName, lastName, email, password);

        const existingUsers = JSON.parse(localStorage.getItem('users')) ?? [];
        if (existingUsers.some(user => user.email === email)) {
            document.getElementById('emailError').textContent = 'Пользователь с такой почтой уже существует!';
            return;
        }
        existingUsers.push(user);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        setCookie('currentUser', JSON.stringify({id: user.id, email: user.email}), 1);
        window.location.href = 'home.html';
    }
})

