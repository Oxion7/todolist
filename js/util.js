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
}

export function checkRegexp(regexp, text, value, errorElement) {
    if (regexp.test(value)) {
        return true;
    }
    document.getElementById(errorElement).textContent = text;
    return false;
}

export function setCookie(name, value, expDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
export function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for(let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if(name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}