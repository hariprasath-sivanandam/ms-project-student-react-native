import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import ModuleService from './services/ModuleService'

const moduleService = ModuleService.instance;

export default class ModuleList extends Component {
    static navigationOptions = {title: 'Modules'}

    constructor(props) {
        super(props)
        this.state = {
            modules: []
        }
    }

    componentDidMount() {
        const modules = this.props.navigation.getParam("modules", []);
        this.setState({
            modules: modules
        })
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.modules.map((module, index) => (
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("LessonTabs", {
                                lessons:module.lessons
                            })}
                        key={index}
                        title={module.title}/>
                ))}
            </View>
        )
    }
}