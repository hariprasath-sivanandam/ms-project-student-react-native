import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Tabs from 'react-native-tabs';

export default class LessonTabs extends Component {
    static navigationOptions = {title: 'Lessons'};

    constructor(props) {
        super(props);
        this.state = {page: 0, lessons: []};
    }

    componentDidMount() {
        const lessons = this.props.navigation.getParam("lessons", []);
        if(lessons.length>0){
            this.setState({
                lessons: lessons,
                page:lessons[0].id
            })
        }
    }

    render() {
        var self = this;
        return (
            <View style={styles.container}>
                <Tabs selected={this.state.page} style={{backgroundColor: 'white'}}
                      selectedStyle={{color: 'red'}} onSelect={el => this.setState({page: el.props.name})}>
                    {this.state.lessons.map((lesson) => (
                            <Text style={styles.tabstyle} name={lesson.id} key={lesson.id}
                                  selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>{lesson.title}</Text>
                        )
                    )}
                </Tabs>
                <Text style={styles.welcome}>
                    Welcome to React Native
                </Text>
                <Text style={styles.instructions}>
                    Selected page: {this.state.page}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tabstyle: {
        textAlign: 'center'
    }
});

AppRegistry.registerComponent('LessonTabs', () => LessonTabs);