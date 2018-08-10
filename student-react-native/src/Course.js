import React, {Component} from 'react'
import {View, ScrollView, ToastAndroid} from 'react-native'
import {Text, Button, Card, ButtonGroup,Icon} from 'react-native-elements'
import CourseService from './services/CourseService'
import SectionService from './services/SectionService'
import StudentService from './services/StudentService'
import ToggleButton from './ToggleButton'
import Spinner from 'react-native-loading-spinner-overlay';

const courseService = CourseService.instance;
const sectionService = SectionService.instance;
const studentService = StudentService.instance;

export default class Course extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            title: state.params ? state.params.title : "Courses",
            headerLeft: <Icon name="menu" size={25} onPress={ () => state.params.rr.openDrawer() } />,
            headerStyle: {
                backgroundColor: '#546E7A'
            }
        };
    };

    constructor(props) {
        super(props);
        let courseType = null;
        if (this.props.screenProps && this.props.screenProps.courseType) {
            courseType = this.props.screenProps.courseType;
        }
        else {
            courseType = this.props.navigation.getParam("courseType");
        }
        this.state = {user: {}, courses: [], my_sections: [], courseType: courseType, loading: false};
        this.loadCourses = this.loadCourses.bind(this);
        this.setHeader = this.setHeader.bind(this);
    }

    componentDidMount() {
        console.log("inside component did mount");
        let courseType = null;
        if (this.props.screenProps && this.props.screenProps.courseType) {
            courseType = this.props.screenProps.courseType;
        }
        else {
            courseType = this.props.navigation.getParam("courseType");
        }
        console.log(courseType);
        this.setState({courseType: courseType});
        //this.setHeader(courseType);
        this.loadCourses(courseType);
        this.updateCourseDetails.bind(this);
    }

    handleOnNavigateBack = () => {
        this.loadCourses(this.state.courseType);
    };

    setHeader(courseType) {
        const {setParams} = this.props.navigation;
        setParams({
            title: courseType == "MY_COURSE" ? "My Courses (" + this.state.courses.length + ")" : "All Courses (" + this.state.courses.length + ")",
            rr: this.props.screenProps.rootNavigation
        });
    }

    loadCourses(courseType) {
        this.setState({courses: [], my_sections: [], user: {}, loading: true});
        let courseData = [];
        let sectionData = [];
        let userData = {};
        let errorFlag = false;
        let courseErrorFlag = false;
        courseService.findCourses(courseType).then(courses => {
            console.log("courses");
            console.log(courses);
            courseData = courses;
        }).catch(() => {
            errorFlag = true;
            courseErrorFlag = true;
        }).then(() => sectionService.findSectionsForStudent().then(sections => {
            console.log("sections:");
            console.log(sections);
            sectionData = sections;
        }).catch(() => {
            errorFlag = true;
        }).then(() => studentService.getProfile().then(user => {
            console.log("user");
            console.log(user);
            userData = user;
        }).catch(() => {
            errorFlag = true;
        }))).then(() => {
            if (errorFlag && courseErrorFlag) {
                this.setState({loading: false});
                alert("Login required.");
                this.props.screenProps.rootNavigation.goBack();
            }
            else {
                this.setState({courses: courseData, my_sections: sectionData, user: userData, loading: false});
                this.setHeader(courseType);
            }
        });
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
        courseService.updateCourseType(updatedCourses).then(() => ToastAndroid.show('Successfully updated Information', ToastAndroid.SHORT));
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
                {this.state.courses && this.state.courses.length == 0 &&
                <View style={{alignItems: 'center'}}><Text>No courses to display</Text></View>}
                {this.state.user && this.state.user.admin == true && this.state.courses && this.state.courses.length > 0 &&
                <Button leftIcon={{name: 'save'}} backgroundColor='#66BB6A' title={"SAVE"}
                        onPress={() => this.updateCourseDetails()}/>}
                {this.state.courses.map((course, index) => (
                    <Card
                        key={index}
                        title={course.title}>
                        {this.state.user && this.state.user.admin == true &&
                        <ToggleButton ref={'Course_' + course.id} selectedIndex={course.courseType === 'public' ? 0 : 1}
                                      buttons={["public", "private"]}/>}
                        <Button
                            backgroundColor='#00897B'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='COURSE DETAILS' leftIcon={{name: 'description'}} onPress={() => this.props.navigation
                            .navigate('ModuleList', {modules: course.modules})}/>
                        <Button
                            backgroundColor='#546E7A'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            leftIcon={{name: 'info'}} title='SECTIONS' onPress={() => this.props.navigation
                            .navigate('SectionList', {
                                sections: course.sections,
                                my_sections: this.state.my_sections,
                                onNavigateBack: this.handleOnNavigateBack
                            })}/>
                        {this.state.user && this.state.user.admin == true &&
                        <Button
                            backgroundColor='#757575'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            leftIcon={{name: 'edit'}} title='EDIT SECTIONS' onPress={() => this.props.navigation
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