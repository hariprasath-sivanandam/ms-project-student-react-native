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
            headerLeft: null,
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
        this.state = {user: {}, courses: [], my_sections: [], courseType: courseType,loading:false};
        this.loadCourses = this.loadCourses.bind(this);
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
        const {setParams} = this.props.navigation;
        setParams({title: courseType == "MY_COURSE" ? "My Courses" : "All Courses"});
        this.loadCourses(courseType);
        this.updateCourseDetails.bind(this);
    }

    handleOnNavigateBack = () => {
        this.loadCourses(this.state.courseType);
    };

    loadCourses(courseType) {
        this.setState({courses: [], my_sections: [], user: {},loading:true});

        // courseService.findCourses(courseType).then(courses => {
        //     console.log("courses");
        //     console.log(courses);
        //     this.setState({courses: courses})
        //     //localCourses = courses;
        // }).catch(() => {
        //     console.log("Error course service");
        //     alert("Error occured. Try again.")
        // });
        //
        // sectionService.findSectionsForStudent().then(sections => {
        //     console.log("sections:");
        //     console.log(sections);
        //     this.setState({my_sections: sections});
        // }).catch(() => {
        //     console.log("Error section service");
        //     alert("Error retrieving data. Login required");
        // });
        //
        // studentService.getProfile().then(user => {
        //     console.log("user");
        //     console.log(user);
        //     this.setState({user: user});
        // }).catch(() => {
        //     console.log("Error student service");
        //     alert("Error retrieving data. Login required");
        // });

        ///////////////////////////////////////////////////////////
        //Don't delete this code. Its a bit efficient, but untested.
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
        }).then(()=> studentService.getProfile().then(user => {
            console.log("user");
            console.log(user);
            userData = user;
        }).catch(() => {
            errorFlag = true;
        }))).then(()=>{
            if(errorFlag && courseErrorFlag){
                this.setState({loading:false});
                alert("Login required.");
            }
            else{
                this.setState({courses:courseData,my_sections:sectionData,user:userData,loading:false});
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
                <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                {this.state.courses && this.state.courses.length ==0 && <Text style={{textAlign:"center"}}>No courses to display</Text>}
                {this.state.user && this.state.user.admin == true && this.state.courses && this.state.courses.length > 0 &&
                <Button leftIcon={{name:'save'}} backgroundColor='#66BB6A' title={"SAVE"} onPress={() => this.updateCourseDetails()}/>}
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
                            title='COURSE DETAILS' leftIcon={{name:'description'}} onPress={() => this.props.navigation
                            .navigate('ModuleList', {modules: course.modules})}/>
                        <Button
                            backgroundColor='#546E7A'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            leftIcon={{name:'info'}} title='SECTIONS' onPress={() => this.props.navigation
                            .navigate('SectionList', {
                                sections: course.sections,
                                my_sections: this.state.my_sections,
                                onNavigateBack: this.handleOnNavigateBack
                            })}/>
                        {this.state.user && this.state.user.admin == true &&
                        <Button
                            backgroundColor='#757575'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            leftIcon={{name:'edit'}} title='EDIT SECTIONS' onPress={() => this.props.navigation
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