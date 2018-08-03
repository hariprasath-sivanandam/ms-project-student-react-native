import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity,  Text, View, StatusBar, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';
import Logout from "./Logout";
import Profile from "./Profile";
import AllCourse from "./AllCourse";
import MyCourse from "./MyCourse";
import Login from "./Login";
import ModuleList from './src/ModuleList';
import SectionList from './src/SectionList';
import SectionEdit from './src/SectionEdit';
import LessonTabs from './src/LessonTabs';
import Course from './src/Course';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
    <View style={{ flex: 1, backgroundColor: '#43484d' }}>
        <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Student World</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
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

const DrawerRouter = createDrawerNavigator({
        Login:{
            screen: Login,
            navigationOptions: ({navigation}) => ({
                title: 'Login',
                headerLeft: (
                    <Icon
                        name="bars"
                        size={30}
                        type="font-awesome"
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.navigate('DrawerOpen')}
                    />
                ),
            })
        },
        MyCourse: {
            screen: MyCourse,
            params:{courseType: "MY_COURSE"},
        },
        AllCourse: {
            screen: AllCourse,
            params:{courseType: "ALL_COURSE"}
        },
        Profile: {
            screen: Profile,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        justifyContent: 'center',
    },
});

export default class MyRoutes extends React.Component{
    render(){
        return(<DrawerRouter/>);
    }
}