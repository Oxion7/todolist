import {User, setCookie} from "./util.js";

document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    //clear error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    const formData = {
         firstName : document.getElementById('firstName').value.trim(),
         lastName : document.getElementById('lastName').value.trim(),
         email : document.getElementById('email').value.trim(),
         password : document.getElementById('password').value.trim(),
         confirmPassword : document.getElementById('confirmPassword').value.trim(),
    };
    //regex
    const nameRegExp = /^[а-яА-Яa-zA-Z-]{2,30}$/;
    const emailRegExp = /^(((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])){1,60}$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s:])(\S){8,16}$/;/*
    1 number (0-9)
    1 uppercase letters
    1 lowercase letters
    1 non-alpha numeric number
    8-16 characters
    */
    const validationRules = {
        firstName: {
            regex: nameRegExp,
            errorMessage: "Имя может содержать только буквы (русские или английские)",
        },
        lastName: {
            regex: nameRegExp,
            errorMessage: "Фамилия может содержать только буквы (русские или английские)",
        },
        email: {
            regex: emailRegExp,
            errorMessage: 'Введите корректный email (например: example@domain.com)',
        },
        password: {
            regex: passwordRegExp,
            errorMessage: 'Пароль должен содержать: 8-16 символов, минимум 1 цифру, 1 заглавную букву, 1 строчную букву и 1 специальный символ',
        },
        confirmPassword: {
            matchWith: 'password',
            errorMessage: 'Пароли не совпадают',
        }
    };

    if (validateForm(formData)) {

        const user = new User(formData['firstName'], formData['lastName'], formData['email'], formData['password']);

        const userExists = User.getUserByEmail(user.email);
        if (userExists) {
            document.getElementById('emailError').textContent = 'Пользователь с такой почтой уже существует!';
            return;
        }
        User.addUser(user);
        setCookie('currentUser', JSON.stringify({id: user.id, email: user.email}), 1);
        window.location.href = 'index.html';
    }
    function validateForm(formData){
        let isValid = true;
        for (const fieldName in validationRules) {
            const value = formData[fieldName];
            if(!validateField(fieldName,value,formData)){
                isValid = false;
            }
        }
        return isValid;
    }
    function validateField(fieldName, value, formData) {
        const rules = validationRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);

        errorElement.textContent = '';

        if ((rules.regex && !rules.regex.test(value)) || (rules.matchWith && value !== formData[rules.matchWith])) {
            errorElement.textContent = rules.errorMessage;
            return false;
        }
        return true;
    }
})

