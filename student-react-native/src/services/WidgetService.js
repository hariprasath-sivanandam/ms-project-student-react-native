import 'es6-symbol/implement';

const WIDGET_API_URL_FULLY_QUALIFIED =
    'https://ms-project-java-server.herokuapp.com/api/lesson/LID/widget/WID';

const WIDGET_API_URL =
    'https://ms-project-java-server.herokuapp.com/api/widget/WID';

let _singleton = Symbol();
export default class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }

    findAllWidgetsForLesson(lessonId) {
        return fetch(
            WIDGET_API_URL_FULLY_QUALIFIED
                .replace('LID', lessonId).replace('/WID',''))
            .then(function (response) {
                return response.json();
            })
    }

    createWidget(lessonId, widget) {
        return fetch(WIDGET_API_URL_FULLY_QUALIFIED.replace('LID', lessonId).replace('/WID',''),
            {
                body: JSON.stringify(widget),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteWidget(widgetId) {
        return fetch(WIDGET_API_URL.replace('WID', widgetId) , {method: 'DELETE'});
    }

    saveWidgets(lessonId, widgets) {
        return fetch(WIDGET_API_URL_FULLY_QUALIFIED.replace('LID', lessonId).replace('/WID','')+'s/save',
            {
                body: JSON.stringify(widgets),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
    }
}
