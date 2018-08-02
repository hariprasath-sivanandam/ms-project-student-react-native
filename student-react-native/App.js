import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {List, ListItem, Button, FormInput} from 'react-native-elements';
import Login from './src/Login/login'
import ModuleList from './src/ModuleList'
import SectionList from './src/SectionList'
import SectionEdit from './src/SectionEdit'
import LessonTabs from './src/LessonTabs'
import Course from './src/Course'
import {createStackNavigator} from 'react-navigation'

// class Apps extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Login/>
//             </View>
//         );
//     }
// }

const App = createStackNavigator({
    Course,
    Login,
    ModuleList,
    LessonTabs,
    SectionList,
    SectionEdit
});

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        justifyContent: 'center',
    },
});
