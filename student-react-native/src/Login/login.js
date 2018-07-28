import React, {Component} from 'react'
import {StyleSheet, View, Text,KeyboardAvoidingView,StatusBar} from 'react-native'
import Loginform from './loginform'

export default class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <Loginform/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3498db'
    },
    text: {
        alignItems: "center",
        justifyContent: "center"
    }
});