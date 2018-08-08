import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import StudentService from './src/services/StudentService'
import MyRoutes from "./MyRoutes";

const studentService = StudentService.instance;

export default class Logout extends Component {
    constructor(props){
        super(props)
        this.logout=this.logout.bind(this);
        this.logout();
    }

    logout(){
        studentService.logout();
    }

    render(){
        return(<MyRoutes/>);
    }
}
