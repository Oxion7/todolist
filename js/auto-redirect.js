import {getCookie, User} from "./util.js";

document.addEventListener('DOMContentLoaded', () => {
    const currentUserId = JSON.parse(getCookie('currentUser')).id;

    if (!currentUserId) return;
    try {
        const user = User.getUserById(currentUserId);

        if (user) {
            window.location.href = 'index.html';
        }
    } catch (e) {

        console.error('Error parsing user cookie:', e);
    }
});