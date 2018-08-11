import React, {Component} from 'react'
import {ScrollView, ToastAndroid} from 'react-native'
import {Button, Card, Text} from 'react-native-elements'
import SectionService from '../services/SectionService'

const sectionService = SectionService.instance;

export default class SectionList extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            title: state.params ? state.params.title : "Sections"
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            my_sections: []
        };
        this.enrollStudent = this.enrollStudent.bind(this);
        this.sectionIsPresent = this.sectionIsPresent.bind(this);
        this.unrollStudent = this.unrollStudent.bind(this);
        this.setHeader = this.setHeader.bind(this);
    }

    componentDidMount() {
        const sections = this.props.navigation.getParam("sections", []);
        const my_sections = this.props.navigation.getParam("my_sections", []);
        this.setState({
            sections: sections,
            my_sections: my_sections
        }, () => {
            this.setHeader()
        });
    }

    setHeader() {
        const {setParams} = this.props.navigation;
        setParams({
            title: "Sections (" + this.state.sections.length + ")",
        });
    }

    enrollStudent(sectionId) {
        let self = this;

        sectionService.enrollStudentInSection(sectionId).then(response => {
            return response.json()
        }).then((res) => {
            console.log("inside enroll");
            console.log(res);
            self.props.navigation.state.params.onNavigateBack();
            ToastAndroid.show('Successfully enrolled in section', ToastAndroid.SHORT);
            self.props.navigation.goBack();
        }).catch(err => {
            alert("Error enrolling student. Login required.");
        });
    }

    unrollStudent(sectionId) {
        let self = this;
        sectionService.unrollStudentInSection(sectionId).then(response => {
            return response.json();
        }).then(() => {
            self.props.navigation.state.params.onNavigateBack();
            ToastAndroid.show('Successfully unrolled from section', ToastAndroid.SHORT);
            self.props.navigation.goBack();
        }).catch(err => {
            alert("Error unrolling student. Login required.");
        });
    }

    sectionIsPresent(sectionId) {
        let found = false;
        let my_sections = this.state.my_sections;
        for (let i = 0; i < my_sections.length; i++) {
            if (my_sections[i].id == sectionId) {
                found = true;
                break;
            }
        }
        return found;
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                {this.state.sections.map((section, index) => (
                    <Card
                        key={index}
                        title={section.name}>
                        <Text>Seats Left: {section.seats}</Text>
                        {this.sectionIsPresent(section.id) ? <Button
                                backgroundColor='#e57373'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                                leftIcon={{name: 'clear'}} title='UNROLL' onPress={() => this.unrollStudent(section.id)}/> :
                            <Button
                                backgroundColor='#66BB6A'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                                leftIcon={{name: 'done'}} title='ENROLL' disabled={section.seats == 0}
                                onPress={() => this.enrollStudent(section.id)}/>}
                    </Card>
                ))}
            </ScrollView>)
    }
}