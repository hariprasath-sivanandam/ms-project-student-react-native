import 'es6-symbol/implement';

const SECTION_API_ENROLL_URL =
    'https://ms-project-java-server.herokuapp.com/api/section/SID/enrollment';

const SECTION_API_URL = 'https://ms-project-java-server.herokuapp.com/api/section/SID'

const SECTION_API_URL_TEST =
    'https://ms-project-java-server.herokuapp.com/api/section/SID/enrollment/12';

const MY_SECTION_API_URL_TEST =
    'https://ms-project-java-server.herokuapp.com/api/student/section/12';

let _singleton = Symbol();
export default class SectionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new SectionService(_singleton);
        return this[_singleton]
    }

    enrollStudentInSection(sectionId) {
        return fetch(SECTION_API_URL_TEST.replace('SID', sectionId),
            {method: 'POST', credentials: "same-origin"})
            .then(function (response) {
                return response;
            })
    }

    unrollStudentInSection(sectionId) {
        return fetch(SECTION_API_URL_TEST.replace('SID', sectionId),
            {method: 'DELETE', credentials: "same-origin"})
            .then(function (response) {
                return response;
            })
    }

    findSectionsForStudent() {
        return fetch(
            MY_SECTION_API_URL_TEST, {method: 'GET', credentials: "same-origin"}
        ).then(response => {
            return response.json()
        })
    }

    updateSection(data) {
        return fetch(
            SECTION_API_URL.replace("SID",data.sectionId),
            {   body: JSON.stringify(data),
                method: 'PUT',
                credentials: "same-origin"
            }
        ).then(response => {
            return response.json()
        })
    }

    deleteSection(sectionId){
        return fetch(SECTION_API_URL.replace("SID",sectionId),{
            method:'DELETE'
        })
    }
}
