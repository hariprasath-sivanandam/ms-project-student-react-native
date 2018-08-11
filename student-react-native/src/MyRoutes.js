import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator, createStackNavigator, DrawerItems} from 'react-navigation';
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ModuleList from './components/ModuleList';
import SectionList from './components/SectionList';
import SectionEdit from './components/SectionEdit';
import LessonTabs from './components/LessonTabs';
import Course from './components/Course';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
    <View style={{flex: 1, backgroundColor: '#43484d'}}>
        <View style={{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
            <Text>WhiteBoard</Text>
        </View>
        <View style={{marginLeft: 10}}>
            <DrawerItems {...props} />
        </View>
    </View>
);


const CustomStack = createStackNavigator({
    Course,
    ModuleList,
    LessonTabs,
    SectionList,
    SectionEdit
});

class AllCourse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CustomStack screenProps={{rootNavigation: this.props.navigation, courseType: 'ALL_COURSE'}}/>);
    }
}

class MyCourse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CustomStack screenProps={{rootNavigation: this.props.navigation, courseType: 'MY_COURSE'}}/>);
    }
}

const DrawerRouter = createDrawerNavigator({
        Login: {
            screen: Login,
            navigationOptions: ({navigation}) => ({
                title: 'Login',
            })
        },
        "My Courses": {
            screen: MyCourse,
        },
        "All Courses": {
            screen: AllCourse,
        },
        Profile: {
            screen: Profile
        },
        Logout: {
            screen: Logout,
        }
    },
    {
        initialRouteName: 'Login',
        contentOptions: {
            activeTintColor: '#548ff7',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: '#ffffff',
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
                fontSize: 15,
                marginLeft: 0,
            },
        },
        drawerWidth: SCREEN_WIDTH * 0.8,
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

export default class MyRoutes extends React.Component {
    render() {
        return (<DrawerRouter/>);
    }
}