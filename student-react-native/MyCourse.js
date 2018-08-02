import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import MyRoutes from './MyRoutes'
export default class MyCourse extends Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <View>
                <Text>My Course page</Text>
            </View>
        );
    }
}
