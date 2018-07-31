import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, Card} from 'react-native-elements'
import CourseService from './services/CourseService'
import SectionService from './services/SectionService'

const courseService = CourseService.instance;
const sectionService = SectionService.instance;

export default class Course extends Component {
    static navigationOptions = {title: 'Courses'};

    constructor(props) {
        super(props)
        this.state = {courses: [], my_sections: [], courseType: ""}
        this.loadCourses = this.loadCourses.bind(this);
    }

    componentDidMount() {
        //const courseType = this.props.navigation.getParam("courseType", "ALL_COURSE");
        const courseType = "ALL_COURSE"
        this.setState({courseType:courseType})
        this.loadCourses(courseType);
    }

    handleOnNavigateBack = () => {
        this.loadCourses(this.state.courseType);
    }

    loadCourses(courseType) {
        this.setState({courses: []})
        sectionService.findSectionsForStudent().then(sections => this.setState({my_sections: sections})).catch(() => {
            alert("Error retrieving data. Login required")
        })
        courseService.findCourses(courseType).then(courses => this.setState({courses: courses})).catch(() => {
            alert("Error retrieving data. Login required")
        })
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                {this.state.courses.map((course, index) => (
                    <Card
                        key={index}
                        title={course.title}>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='COURSE DETAILS' onPress={() => this.props.navigation
                            .navigate('ModuleList', {modules: course.modules})}/>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='SECTIONS' onPress={() => this.props.navigation
                            .navigate('SectionList', {
                                sections: course.sections,
                                my_sections: this.state.my_sections,
                                onNavigateBack: this.handleOnNavigateBack
                            })}/>
                    </Card>
                ))}

            </ScrollView>)
    }
}