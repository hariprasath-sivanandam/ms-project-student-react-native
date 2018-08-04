import 'es6-symbol/implement';

const LESSON_API_URL =
    'https://ms-project-java-server.herokuapp.com/api/course/CID/module/MID/lesson';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(
            LESSON_API_URL
                .replace('CID', courseId).replace('MID', moduleId)).then(function (response) {
            return response.json();
        })
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId),
            {
                body: JSON.stringify(lesson),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL.replace('course/CID/module/MID/', "") + "/" + lessonId, {method: 'DELETE'});
    }
}
