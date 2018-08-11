import 'es6-symbol/implement';

let _singleton = Symbol();
const LOGIN_URL =
    'https://ms-project-java-server.herokuapp.com/api/student/login';
const PROFILE_URL =
    'https://ms-project-java-server.herokuapp.com/api/student/profile';
const LOGOUT_URL =
    'https://ms-project-java-server.herokuapp.com/api/student/logout';
const REGISTER_URL =
    'https://ms-project-java-server.herokuapp.com/api/student/register';

class StudentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new StudentService(_singleton);
        return this[_singleton]
    }

    login(uname, pwd) {
        return fetch(LOGIN_URL,
            {
                body: JSON.stringify({"username": uname, "password": pwd}),
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                credentials: 'same-origin'
            })
            .then((response) => {
                return response.json();
            });
    }

    register(uname, pwd) {
        return fetch(REGISTER_URL,
            {
                body: JSON.stringify({"username": uname, "password": pwd}),
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                credentials: 'same-origin'
            })
            .then((response) => {
                return response.json();
            });
    }

    getProfile() {
        return fetch(PROFILE_URL, {
            credentials: "same-origin",
        }).then(function (response) {
            return response.json();
        });
    }

    updateProfile(user) {
        return fetch(PROFILE_URL,
            {
                body: JSON.stringify(user),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT',
                credentials: 'same-origin'
            }).then((response) => {
            return response.json();
        })
    }

    logout() {
        return fetch(LOGOUT_URL, {
            method: 'POST',
            credentials: "same-origin",
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            return response.json();
        });
    }
}

export default StudentService;
