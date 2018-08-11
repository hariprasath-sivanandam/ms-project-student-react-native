import React, {Component} from 'react';
import StudentService from '../services/StudentService'
import MyRoutes from "../MyRoutes";

const studentService = StudentService.instance;

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.logout();
    }

    logout() {
        studentService.logout();
    }

    render() {
        return (<MyRoutes/>);
    }
}
