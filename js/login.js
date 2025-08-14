import {setCookie, User} from './util.js';

document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = User.getUserByEmail(email);
    if (!user) {
        document.getElementById('emailError').textContent = 'Пользователя не существует';
        return;
    }
    if (user.password !== password) {
        document.getElementById('passwordError').textContent = 'Неправильный пароль';
        return;
    }
    setCookie('currentUser', JSON.stringify({id: user.id, email: user.email}), 1);
    window.location.href = 'index.html';
})