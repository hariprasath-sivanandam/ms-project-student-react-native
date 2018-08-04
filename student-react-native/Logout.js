import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import StudentService from './src/services/StudentService'

const studentService = StudentService.instance;

export default class Logout extends Component {
    constructor(props){
        super(props);
        studentService.logout();
    }

    render(){
        return(
            <View>
                <Text>Logout page</Text>
            </View>
        );
    }
}
