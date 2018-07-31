let _singleton = Symbol();
const COURSE_API_URL =
    'https://ms-project-java-server.herokuapp.com/api/course';

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
        if(courseType == "ALL_COURSE"){
            return fetch(COURSE_API_URL)
                .then(function (response) {
                    return response.json();
                });
        }
        return fetch(STUDENT_COURSE_API_URL)
            .then(function (response) {
                return response.json();
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
        return fetch(COURSE_API_URL+"/"+courseId, {method: 'DELETE'});
    }


}

export default CourseService;
