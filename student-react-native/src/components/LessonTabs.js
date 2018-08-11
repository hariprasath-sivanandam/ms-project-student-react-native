import React, {Component} from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';

import Tabs from 'react-native-tabs';
import {Card, List, ListItem, Text} from 'react-native-elements'


export default class LessonTabs extends Component {
    static navigationOptions = {title: 'Lessons'};

    constructor(props) {
        super(props);
        this.state = {page: 0, lessons: [], widgets: []};
    }

    componentDidMount() {
        const lessons = this.props.navigation.getParam("lessons", []);
        if (lessons.length > 0) {
            this.setState({
                lessons: lessons,
                lessonId: lessons[0].id,
                widgets: lessons.length > 0 ? lessons[0].widgets : []
            })
        }
    }

    render() {
        var self = this;
        return (
            <View style={styles.container}>
                <Tabs selected={this.state.lessonId} style={{backgroundColor: 'white'}}
                      selectedStyle={{color: 'red'}}
                      onSelect={el => this.setState({lessonId: el.props.lessonId, widgets: el.props.widgets})}>
                    {this.state.lessons.map((lesson) => (
                            <Text style={styles.tabstyle} lessonId={lesson.id} key={lesson.id} widgets={lesson.widgets}
                                  selectedIconStyle={{borderTopWidth: 2, borderTopColor: 'red'}}>{lesson.title}</Text>
                        )
                    )}
                </Tabs>
                {this.state.widgets.map((widget) => {
                    switch (widget.widgetType) {
                        case "Heading":
                            return <Card key={this.state.lessonId + "" + widget.id} title="Heading"><Text
                                h1={1 == widget.size} h2={2 == widget.size}
                                h3={3 == widget.size}
                                h4={4 == widget.size}>{widget.text}</Text></Card>;
                        case "Paragraph":
                            return <Card key={this.state.lessonId + "" + widget.id}
                                         title="Paragraph"><Text>{widget.text}</Text></Card>;
                        case "List":
                            return (<Card key={this.state.lessonId + "" + widget.id} title="List"><List>
                                {
                                    widget.listItems.split("\n").map((item, i) => {
                                        let listText = widget.listType == "ordered" ? (i + 1) + ".   " + item : item;
                                        if (widget.listType == "unordered") {
                                            return <ListItem
                                                key={this.state.lessonId + "" + "ulist" + widget.id + i}
                                                title={listText}
                                                hideChevron={true}
                                                leftIcon={{
                                                    type: "font-awesome",
                                                    name: 'chevron-right',
                                                }}
                                            />
                                        }
                                        else {
                                            return <ListItem
                                                key={this.state.lessonId + "" + "olist" + widget.id + i}
                                                title={listText}
                                                hideChevron={true}
                                            />
                                        }
                                    })
                                }
                            </List></Card>);
                        case "Link":
                            return (<Card key={this.state.lessonId + "" + widget.id} title="Link"><Text
                                style={{color: 'blue'}}
                                onPress={() => Linking.openURL(widget.href)}>{widget.text}
                            </Text></Card>);
                        case "Image":
                            return (<Card key={this.state.lessonId + "" + widget.id} title="Image"><View
                                style={{alignItems: "center"}}><Image
                                style={{width: 100, height: 100}}
                                source={{uri: widget.src}}
                            /></View></Card>)
                    }
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tabstyle: {
        textAlign: 'center'
    }
});