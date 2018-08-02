import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { ButtonGroup } from 'react-native-elements';

export default class ToggleButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedIndex: props.selectedIndex,
            buttons:props.buttons
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    getToggleState(){
        return this.state.selectedIndex == 0?"public":"private";
    }

    render () {
        const buttons = this.state.buttons;
        const selectedIndex  = this.state.selectedIndex;

        return (
            <ButtonGroup
                selectedButtonStyle= {styles.container}
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 30}}
            />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00A3AA'
    }
})