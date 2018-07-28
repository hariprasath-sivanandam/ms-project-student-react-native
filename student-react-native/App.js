import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {List, ListItem, Button, FormInput} from 'react-native-elements';
import Login from './src/Login/login'

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Login/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        justifyContent: 'center',
    },
});
