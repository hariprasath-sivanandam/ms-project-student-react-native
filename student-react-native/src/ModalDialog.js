import React, {Component} from 'react';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import {StyleSheet, View, Modal, Text, Button, Platform, ToastAndroid} from 'react-native';
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
            newSectionName: props.sectionName,
            newSectionMaxseats: props.sectionMaxseats,
            sectionSeats: props.sectionSeats,
            courseId: props.courseId,
            callback: props.callback,
            type: props.type
        };
        this.validate = this.validate.bind(this);
    }

    ShowModalFunction(visible) {
        this.setState({ModalVisibleStatus: visible});
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            ModalVisibleStatus: newProps.visible,
            sectionId: newProps.sectionId,
            sectionName: newProps.sectionName,
            sectionSeats: newProps.sectionSeats,
            sectionMaxseats: newProps.sectionMaxseats,
            newSectionName: newProps.sectionName,
            newSectionMaxseats: newProps.sectionMaxseats,
            courseId: newProps.courseId,
            callback: newProps.callback,
            type: newProps.type
        })
    }

    validate() {
        return (this.state.newSectionName &&
            this.state.newSectionName.length > 0 &&
            this.state.newSectionMaxseats &&
            this.state.newSectionMaxseats.length > 0 &&
            !isNaN(Number(this.state.newSectionMaxseats)))
    }


    updateSection() {
        if (this.validate() && Number(this.state.newSectionMaxseats) >= (Number(this.state.sectionMaxseats) - Number(this.state.sectionSeats))) {
            let sectionObj = {
                'id': this.state.sectionId,
                'name': this.state.newSectionName,
                'seats': (this.state.newSectionMaxseats - this.state.sectionMaxseats) + this.state.sectionSeats,
                'maxseats': this.state.newSectionMaxseats
            };

            courseService.updateSection(this.state.courseId, sectionObj).then(() => {
                ToastAndroid.show('Successfully updated', ToastAndroid.SHORT);
                this.ShowModalFunction(false);
                this.state.callback(sectionObj);
            }).catch(err => alert("Error!"))
        }
        else {
            alert("Please enter valid values")
        }
    }

    addSection() {
        if (this.validate()) {
            let sectionObj = {
                'id': this.state.sectionId,
                'name': this.state.newSectionName,
                'seats': this.state.sectionMaxseats,
                'maxseats': this.state.newSectionMaxseats
            };
            courseService.addSection(this.state.courseId, sectionObj).then((responseObj) => {
                ToastAndroid.show('Successfully Added', ToastAndroid.SHORT);
                this.ShowModalFunction(false);
                this.state.callback(responseObj);
            }).catch(err => alert("Error!"))
        }
        else {
            alert("Please enter valid values")
        }
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
                                           onChangeText={(val) => this.setState({newSectionName: val})}>{this.state.newSectionName}</FormInput>
                                <FormInput placeholder="Max seats"
                                           onChangeText={(val) => this.setState({newSectionMaxseats: val})}>{this.state.newSectionMaxseats}</FormInput>
                            </View>
                            <View style={{marginTop: 10, backgroundColor: '#26A69A'}}>
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