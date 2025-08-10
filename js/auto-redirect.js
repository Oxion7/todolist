import {getCookie} from "./util.js";

document.addEventListener('DOMContentLoaded', () => {
    const currentUserCookie = getCookie('currentUser');

    if (currentUserCookie) {
        try {
            const user = JSON.parse(currentUserCookie);

            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = existingUsers.some(u => u.id === user.id && u.email === user.email);

            if (userExists) {
                window.location.href = 'todo.html';
            }
        } catch (e) {

            console.error('Error parsing user cookie:', e);
        }
    }
});