import React, {Component} from 'react'
import {StyleSheet, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StatusBar} from 'react-native'
import {Button, FormInput} from 'react-native-elements'


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.checkLogin = this.checkLogin.bind(this);
        self = this;
    }

    checkLogin() {
        alert("inside login method");
        // alert(this.state.username);
        // alert(this.state.password);
        // fetch("https://ms-project-java-server.herokuapp.com/api/student/login",
        //     {
        //         body: JSON.stringify({username: "hari", password: "qwerty"}),
        //         method: "POST",
        //         headers: {'Content-type': 'application/json'}
        //     }).then(res =>{return res.json()}).then().catch(err => alert(err))

        fetch("https://ms-project-java-server.herokuapp.com/api/course").then(res => {
            return res.json()
        }).then(r => alert("dfsdf")).catch(err => alert(err))
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    {/*<StatusBar barStyle='light-content'/>*/}
                    {/*<TextInput placeholder='username or email' placeholderTextColor='rgba(255, 255, 255, 0.7)'*/}
                    {/*returnKeyType='next' onSubmitEditing={() => this.passwordInput.focus()}*/}
                    {/*KeyboardType='email-address' autoCapitalize='none' autoCorrect={false}*/}
                    {/*onChangeText={(text) => this.setState({username: text})}*/}
                    {/*style={styles.input}/>*/}
                    {/*<TextInput placeholder='password' placeholderTextColor='rgba(255, 255, 255, 0.7)' returnKeyType='go'*/}
                    {/*secureTextEntry style={styles.input} ref={(input) => this.passwordInput = input}*/}
                    {/*onChangeText={(text) => this.setState({password: text})}*/}
                    {/*KeyboardType='password' style={styles.input}/>*/}
                    <FormInput/>
                    <FormInput/>
                    <Button style={styles.buttonContainer}><Text
                        style={styles.buttonText}
                        onPress={() => alert("ssrrg")}>LOGIN</Text></Button>
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