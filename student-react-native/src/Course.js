import React, {Component} from 'react'
import {View, ScrollView, TouchableOpacity} from 'react-native'
import {Text, Button, Card, ButtonGroup, Icon} from 'react-native-elements'
import CourseService from './services/CourseService'
import SectionService from './services/SectionService'
import StudentService from './services/StudentService'
import ToggleButton from './ToggleButton'
import MyRoutes from '../MyRoutes'
const courseService = CourseService.instance;
const sectionService = SectionService.instance;
const studentService = StudentService.instance;

export default class Course extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Allcourse Title',
        headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.navigate('DrawerOpen') } />
    })
    // static navigationOptions = ({navigation, screenProps}) =>({
    //     title: 'Courses1',
    //     headerRight: (
    //         <Button
    //             title='Setting'
    //             onPress={ () => props.navigation.navigate('DrawerOpen') }
    //             backgroundColor= "rgba(0,0,0,0)"
    //             color="rgba(0,122,255,1)"
    //         />
    //     ),
        // style: {
        //     marginTop: Platform.OS === 'android' ? 24 : 0
        // },
    //     tabBarIcon: ({ tintColor}) => {
    //         return <Icon name = "favorite" size={26} color={tintColor} />;
    //     }
    // });

    constructor(props) {
        super(props);
        let courseType = null;
        if(this.props.screenProps && this.props.screenProps.courseType){
            courseType =  this.props.screenProps.courseType;
        }
        else{
            courseType = this.props.navigation.getParam("courseType");
        }
        this.state = {user: {}, courses: [], my_sections: [], courseType: courseType};
        this.loadCourses = this.loadCourses.bind(this);
    }

    componentDidMount() {
        console.log("inside component did mount")
        let courseType = null;
        if(this.props.screenProps && this.props.screenProps.courseType){
            courseType =  this.props.screenProps.courseType;
        }
        else{
            courseType = this.props.navigation.getParam("courseType");
        }
        console.log(courseType);
        this.setState({courseType: courseType});
        this.loadCourses(courseType);
        this.updateCourseDetails.bind(this);
    }

    handleOnNavigateBack = () => {
        this.loadCourses(this.state.courseType);
    };

    loadCourses(courseType) {
        this.setState({courses: [], my_sections: [], user: {}});

        courseService.findCourses(courseType).then(courses => {
            console.log("courses");
            console.log(courses);
            this.setState({courses: courses})
            //localCourses = courses;
        }).catch(() => {
            console.log("Error course service");
            alert("Error occured. Try again.")
        });
        sectionService.findSectionsForStudent().then(sections => {
            console.log("sections:");
            console.log(sections);
            this.setState({my_sections: sections})
        }).catch(() => {
            console.log("Error section service");
            alert("Error retrieving data. Login required")
        });

        studentService.getProfile().then(user => {
            console.log("user");
            console.log(user);
            this.setState({user: user})
        }).catch(() => {
            console.log("Error student service");
            alert("Error retrieving data. Login required")
        })

        /////////////////////////////////////////////////////////////
        // let courseData = [];
        // let sectionData = [];
        // let userData = {};
        //
        // courseService.findCourses(courseType).then(courses => {
        //     sectionService.findSectionsForStudent().then(sections => {
        //         studentService.getProfile().then(user => {
        //             userData = user;
        //         }).catch(() => {
        //             console.log("Error student service");
        //             alert("Error retrieving data. Login required");
        //         });
        //         sectionData = sections;
        //     }).catch(() => {
        //         console.log("Error section service");
        //         alert("Error retrieving data. Login required");
        //     });
        //     courseData = courses;
        // }).then(
        //     () => {
        //         console.log("courses");
        //         console.log(courseData);
        //         console.log("sections:");
        //         console.log(sectionData);
        //         console.log("user");
        //         console.log(userData);
        //         this.setState({courses: courseData, my_sections: sectionData, user: userData})
        //     }).catch(() => {
        //     console.log("Error course service");
        //     alert("Error occurred. Try again.");
        // });

    }

    updateCourseDetails() {
        let coursesInfo = [];
        this.state.courses.forEach((course) => {
            let cid = course.id;
            let obj = {};
            obj["courseId"] = cid;
            obj["courseType"] = this.refs["Course_" + course.id].getToggleState();
            coursesInfo.push(obj)
        });

        let updatedCourses = [];
        let courses = this.state.courses;
        courses.forEach(course => {
            coursesInfo.forEach(courseInfo => {
                if (course['id'] == courseInfo['courseId']) {
                    course['courseType'] = courseInfo['courseType'];
                    updatedCourses.push(course)
                }
            })
        });
        this.setState({courses: updatedCourses});
        courseService.updateCourseType(updatedCourses).then(() => alert("Successfully Updated Information"))
    }

    render() {
        return (

            <ScrollView style={{padding: 15}}>
                {this.state.user && this.state.user.admin == true &&
                <Button title={"SAVE"} onPress={() => this.updateCourseDetails()}/>}
                {this.state.courses.map((course, index) => (
                    <Card
                        key={index}
                        title={course.title}>
                        {this.state.user && this.state.user.admin == true &&
                        <ToggleButton ref={'Course_' + course.id} selectedIndex={course.courseType === 'public' ? 0 : 1}
                                      buttons={["public", "private"]}/>}
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='COURSE DETAILS' onPress={() => this.props.navigation
                            .navigate('ModuleList', {modules: course.modules})}/>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='SECTIONS' onPress={() => this.props.navigation
                            .navigate('SectionList', {
                                sections: course.sections,
                                my_sections: this.state.my_sections,
                                onNavigateBack: this.handleOnNavigateBack
                            })}/>
                        {this.state.user && this.state.user.admin == true &&
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='EDIT SECTIONS' onPress={() => this.props.navigation
                            .navigate('SectionEdit', {
                                sections: course.sections,
                                courseId: course.id,
                                callback: this.handleOnNavigateBack
                            })}/>}
                    </Card>
                ))}
            </ScrollView>)
    }
}