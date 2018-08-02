import React, {Component} from 'react'
import {View, ScrollView, Alert, StyleSheet} from 'react-native'
import {Text, ListItem, Button, Card, Icon} from 'react-native-elements'
import SectionService from './services/SectionService'
import ModalDialog from './ModalDialog'
import ActionButton from 'react-native-action-button';

const sectionService = SectionService.instance

export default class SectionEdit extends Component {
    static navigationOptions = {title: 'Sections'}

    constructor(props) {
        super(props)
        this.state = {
            sections: [],
            courseId: -1,
            visible: false,
            callback: props.callback,
            type:'EDIT'
        }
    }

    componentDidMount() {
        const sections = this.props.navigation.getParam("sections", []);
        const courseId = this.props.navigation.getParam("courseId", -1);
        const callback = this.props.navigation.getParam("callback", undefined);
        this.setState({
            sections: sections,
            courseId: courseId,
            callback: callback
        })
    }

    deleteHandler(sectionId) {
        sectionService.deleteSection(sectionId).then(alert("successfully deleted the section"));
        this.setState({
            sections: this.state.sections.filter((section) => {
                return (section.id !== sectionId)
            })
        });
        this.state.callback()
    }

    deleteSection(sectionId) {
        Alert.alert(
            'Delete Section',
            'Are you sure you want to delete?',
            [
                {
                    text: 'Cancel', onPress: () => {
                    }, style: 'cancel'
                },
                {text: 'OK', onPress: () => this.deleteHandler(sectionId)},
            ],
            {cancelable: true}
        )
    }

    editSection(sectionId, sectionName, sectionMaxSeats, sectionSeats) {
        this.setState({
            visible: true,
            currentSectionId: sectionId,
            currentSectionName: sectionName,
            currentSectionMaxseats: sectionMaxSeats,
            currentSectionSeats: sectionSeats,
            type: 'EDIT'
        });
    }

    updateLocalStateEDIT(section) {
        let updatedSections = [];
        this.state.sections.forEach(mysection => {
            if (mysection.id === section.id) {
                mysection.name = section.name;
                mysection.maxseats = section.maxseats;
            }
            updatedSections.push(mysection);
        });

        this.setState({sections: updatedSections, visible: false});
        this.state.callback()
    }

    updateLocalStateADD(section) {
        let updatedSections = this.state.sections;
        updatedSections.push(section);
        this.setState({sections: updatedSections, visible: false});
        this.state.callback()
    }

    addSection() {
        this.setState({
            visible: true,
            currentSectionId: null,
            currentSectionName: null,
            currentSectionMaxseats: null,
            currentSectionSeats: null,
            type: 'ADD'
        });
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                <Button title={"ADD SECTION"} onPress={() => this.addSection()}/>
                {this.state.sections.map((section, index) => (
                    <Card
                        key={index}
                        title={section.name}>
                        <Text>Seats Left: {section.seats}</Text>
                        <Text>Max Seats: {section.maxseats}</Text>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='DELETE' onPress={() => this.deleteSection(section.id)}/>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                            title='EDIT'
                            onPress={() => this.editSection(section.id, section.name, section.maxseats, section.seats)}/>

                    </Card>
                ))}
                {this.state.visible && <ModalDialog visible={true} sectionId={this.state.currentSectionId}
                                                    sectionName={this.state.currentSectionName}
                                                    sectionMaxseats={this.state.currentSectionMaxseats}
                                                    sectionSeats={this.state.currentSectionSeats}
                                                    courseId={this.state.courseId}
                                                    type={this.state.type}
                                                    callback={(section) => {
                                                        this.state.type == 'EDIT' ? this.updateLocalStateEDIT(section) : this.updateLocalStateADD(section)
                                                    }}/>}
            </ScrollView>)
    }
}
