import 'es6-symbol/implement';

let _singleton = Symbol();
const COURSE_API_URL =
    'https://ms-project-java-server.herokuapp.com/api/course';

const SECTION_API_URL =
    'https://ms-project-java-server.herokuapp.com/api/course/CID/section';

const STUDENT_COURSE_API_URL =
    'https://ms-project-java-server.herokuapp.com/api/course/student';

class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    findCourses(courseType) {
        if (courseType == "ALL_COURSE") {
            return fetch(COURSE_API_URL, {method: "GET", credentials: "same-origin"})
                .then(function (response) {
                    return response.json();
                }).then(res => {
                    return res;
                });
        }
        return fetch(STUDENT_COURSE_API_URL, {method: "GET", credentials: "same-origin"})
            .then(function (response) {
                return response.json();
            }).then(res => {
                console.log("inside my course");
                console.log(res);
                return res;
            });
    }

    createCourse(course) {
        return fetch(COURSE_API_URL, {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseId) {
        return fetch(COURSE_API_URL + "/" + courseId, {method: 'DELETE'});
    }

    updateCourseType(courses) {
        return fetch(COURSE_API_URL + '/courseType', {
            body: JSON.stringify(courses),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
    }

    updateSection(courseId, section) {
        return fetch(SECTION_API_URL.replace('CID', courseId), {
            body: JSON.stringify(section),
            headers: {
                'Content-Type': 'application/json',
                'credentials':'same-origin'
            },
            method: 'PUT'
        })
    }

    addSection(courseId, section) {
        return fetch(SECTION_API_URL.replace('CID', courseId), {
            body: JSON.stringify(section),
            headers: {
                'Content-Type': 'application/json',
                'credentials':'same-origin'
            },
            method: 'POST'
        }).then(response => {
            return response.json()
        })
    }

}

export default CourseService;
