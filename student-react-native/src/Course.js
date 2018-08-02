import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, Card, ButtonGroup} from 'react-native-elements'
import CourseService from './services/CourseService'
import SectionService from './services/SectionService'
import StudentService from './services/StudentService'
import ToggleButton from './ToggleButton'

const courseService = CourseService.instance;
const sectionService = SectionService.instance;
const studentService = StudentService.instance;

export default class Course extends Component {
    static navigationOptions = {title: 'Courses'};

    constructor(props) {
        super(props);
        this.state = {user: {}, courses: [], my_sections: [], courseType: ""};
        this.loadCourses = this.loadCourses.bind(this);
    }

    componentDidMount() {
        const courseType = "ALL_COURSE";
        this.setState({courseType: courseType});
        this.loadCourses(courseType);
        this.updateCourseDetails.bind(this)
    }

    handleOnNavigateBack = () => {
        this.loadCourses(this.state.courseType);
    };

    loadCourses(courseType) {
        this.setState({courses: []});
        sectionService.findSectionsForStudent().then(sections => this.setState({my_sections: sections})).catch(() => {
            alert("Error retrieving data. Login required")
        });
        courseService.findCourses(courseType).then(courses => this.setState({courses: courses})).catch(() => {
            alert("Error retrieving data. Login required")
        });
        studentService.getProfile().then(user => {
            this.setState({user: user})
        }).catch(() => {
            alert("Error retrieving data. Login required")
        })
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

        let updatedCourses = []
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