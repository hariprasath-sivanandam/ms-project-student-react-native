import React, {Component} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity, Text,StatusBar} from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class Loginform extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content'/>
                <TextInput placeholder='username or email' placeholderTextColor='rgba(255, 255, 255, 0.7)'
                           returnKeyType='next' onSubmitEditing={() => this.passwordInput.focus()}
                           KeyboardType='email-address' autoCapitalize='none' autoCorrect={false}
                           style={styles.input}/>
                <TextInput placeholder='password' placeholderTextColor='rgba(255, 255, 255, 0.7)' returnKeyType='go'
                           secureTextEntry style={styles.input} ref={(input) => this.passwordInput = input}
                           KeyboardType='password' style={styles.input}/>
                <TouchableOpacity style={styles.buttonContainer}><Text
                    style={styles.buttonText}>LOGIN</Text></TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        fontSize:20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonContainer: {
        color: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        backgroundColor:'#2980b9',
        color: '#ffffff',
        fontWeight: '700',
        fontSize:25
    }
});