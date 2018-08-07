import React, {Component} from 'react';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {StyleSheet, View, Modal, Text, Button, Platform} from 'react-native';
import {Icon} from 'react-native-elements'
import SectionService from './services/SectionService'
import CourseService from './services/CourseService'

const sectionService = SectionService.instance;
const courseService = CourseService.instance;

export default class ModalDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ModalVisibleStatus: props.visible,
            sectionId: props.sectionId,
            sectionName: props.sectionName,
            sectionMaxseats: props.sectionMaxseats,
            sectionSeats: props.sectionSeats,
            courseId: props.courseId,
            callback: props.callback,
            type: props.type
        };
    }

    ShowModalFunction(visible) {
        this.setState({ModalVisibleStatus: visible});
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            ModalVisibleStatus: newProps.visible,
            sectionId: newProps.sectionId,
            sectionName: newProps.sectionName,
            sectionMaxseats: newProps.sectionMaxseats,
            courseId: newProps.courseId,
            callback: newProps.callback,
            type: newProps.type
        })
    }

    updateSection() {
        let sectionObj = {
            'id': this.state.sectionId,
            'name': this.state.sectionName,
            'seats': this.state.sectionSeats,
            'maxseats': this.state.sectionMaxseats
        };

        courseService.updateSection(this.state.courseId, sectionObj).then(() => {
            alert("Successfully updated");
            this.ShowModalFunction(false);
            this.state.callback(sectionObj);
        }).catch(err => alert("Error!"))
    }

    addSection() {
        let sectionObj = {
            'id': this.state.sectionId,
            'name': this.state.sectionName,
            'seats': this.state.sectionMaxseats,
            'maxseats': this.state.sectionMaxseats
        };
        courseService.addSection(this.state.courseId, sectionObj).then((responseObj) => {
            alert("Successfully Added");
            this.ShowModalFunction(false);
            this.state.callback(responseObj);
        }).catch(err => alert("Error!"))
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.ModalVisibleStatus}
                    onRequestClose={() => {
                        this.ShowModalFunction(!this.state.ModalVisibleStatus)
                    }}>

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.ModalInsideView}>
                            <View style={{alignItems: 'flex-end'}}>
                                <Icon
                                    style={{float: 'right'}}
                                    raised reverse
                                    name='times'
                                    type='font-awesome'
                                    color='#e57373'
                                    onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus)}/>
                            </View>
                            <Text
                                style={styles.TextStyle}>{this.state.type == "EDIT" ? "EDIT SECTION" : "ADD SECTION"}</Text>
                            <View style={{alignItems: 'center', marginLeft: 30}}>
                                <FormInput placeholder="Section Name"
                                           onChangeText={(val) => this.setState({sectionName: val})}>{this.state.sectionName}</FormInput>
                                <FormInput placeholder="Max seats"
                                           onChangeText={(val) => this.setState({sectionMaxseats: val})}>{this.state.sectionMaxseats}</FormInput>
                            </View>
                            <View style={{marginTop: 10,backgroundColor:'#26A69A'}}>
                                <Button backgroundColor='#26A69A' title={"Submit"} onPress={() => {
                                    (this.state.type) == 'EDIT' ? this.updateSection() : this.addSection()
                                }}/>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    },

    ModalInsideView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#E8E8E8",
        height: 300,
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },

    TextStyle: {
        fontSize: 20,
        marginBottom: 20,
        color: "#8D6E63",
        padding: 20,
        textAlign: 'center'
    }

});