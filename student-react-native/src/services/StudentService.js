
let _singleton = Symbol();
const STUDENT_API_URL =
    'https://ms-project-java-server.herokuapp.com/api/student/profile';

const STUDENT_API_URL_TEST =
    'https://ms-project-java-server.herokuapp.com/api/student/2';

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

    getProfile() {
        return fetch(STUDENT_API_URL_TEST)
            .then(function (response) {
                return response.json();
            });
    }
}

export default StudentService;
