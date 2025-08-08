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
