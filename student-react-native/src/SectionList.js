import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, ListItem, Button, Card} from 'react-native-elements'
import SectionService from './services/SectionService'

const sectionService = SectionService.instance

export default class SectionList extends Component {
    static navigationOptions = {title: 'Sections'}

    constructor(props) {
        super(props)
        this.state = {
            sections: [],
            my_sections: []
        }
        this.enrollStudent = this.enrollStudent.bind(this);
        this.sectionIsPresent = this.sectionIsPresent.bind(this);
        this.unrollStudent = this.unrollStudent.bind(this);
    }

    componentDidMount() {
        const sections = this.props.navigation.getParam("sections", []);
        const my_sections = this.props.navigation.getParam("my_sections", []);
        this.setState({
            sections: sections,
            my_sections: my_sections
        })
    }

    enrollStudent(sectionId) {
        let self = this;

        sectionService.enrollStudentInSection(sectionId).then(response => {
            return response.json()
        }).then(() => {
            self.props.navigation.state.params.onNavigateBack();
            self.props.navigation.goBack()
        }).catch(err => {
            alert("Error enrolling student. Login required.");
            //self.props.navigation.navigate("Login");
        })
    }

    unrollStudent(sectionId) {
        let self = this;
        sectionService.unrollStudentInSection(sectionId).then(response => {
            return response.json()
        }).then(() => {
            self.props.navigation.state.params.onNavigateBack();
            self.props.navigation.goBack()
        }).catch(err => {
            alert("Error unrolling student. Login required.")
        });
    }

    sectionIsPresent(sectionId) {
        let found = false;
        let my_sections = this.state.my_sections
        for (let i = 0; i < my_sections.length; i++) {
            if (my_sections[i].id == sectionId) {
                found = true;
                break;
            }
        }
        return found
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
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='UNROLL' onPress={() => this.unrollStudent(section.id)}/> : <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='ENROLL' onPress={() => this.enrollStudent(section.id)}/>}

                    </Card>
                ))}

            </ScrollView>)
    }
}