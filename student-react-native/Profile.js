import 'es6-symbol/implement'
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
// const navigateAction = NavigationActions.navigate({
//     routeName: 'MyCourse',
//     params: "my_course",
// });

import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
} from 'react-native';
import { Font } from 'expo';
import { FormInput, FormLabel, Button } from 'react-native-elements'
import { TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('./assets/images/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected}/>
        </View>
    );
};

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

export default class Profile extends Component {

    constructor(props) {
        super(props);
        user1 = fetch("https://ms-project-java-server.herokuapp.com/api/student/profile",{credentials: 'same-origin'})
            .then((response) => {return response.json()})
            .then((user) => {return user; console.log(user)})
        console.log("inside profile")
        this.state = {user: user1};

        this.selectCategory = this.selectCategory.bind(this);
        this.update = this.update.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'georgia': require('./assets/fonts/Georgia.ttf'),
            'regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            'light': require('./assets/fonts/Montserrat-Light.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    update() {
        const user= this.state.user
        console.log(user)
        if(!this.validateEmail(user.email))
            alert("Please enter a valid Email")
        else if(password.length<1)
            alert("Please enter valid password")
        else if(password !== passwordConfirmation)
            alert("Password does not match")
        else{
            fetch("https://ms-project-java-server.herokuapp.com/api/student/profile",
                {
                     body: JSON.stringify({user: user}),
                     headers: { 'Content-Type': 'application/json' },
                     method: 'POST',
                    credentials: 'same-origin'
                })
                .then((resp)=> {return resp.json()})
                .then((user) => {this.state.user=user; alert("User Details updated Successfully")});
            ;
        }

        // const {
        //     email,
        //     password,
        // } = this.state;
        // if(!this.validateEmail(email)){
        //     this.emailInput.shake();
        //     alert("Invalid email");
        // }
        // if(password.length<1){
        //     this.passwordInput.shake();
        //     alert("Invalid password");
        // }
        // this.setState({ isLoading: true });
        // fetch("https://ms-project-java-server.herokuapp.com/api/student/login",
        //     {
        //         body: JSON.stringify({"username":email, "password": password}),
        //         headers: { 'Content-Type': 'application/json' },
        //         method: 'POST'
        //     }).then((resp)=> {alert("login success"); this.setState({isLoading: false})});
    }

    render() {
        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            email,
            password,
            username,
            firstname,
            lastname,
            phone,
            passwordConfirmation,
        } = this.state.user;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    {this.state.fontLoaded ?
                        <View>
                            <KeyboardAvoidingView contentContainerStyle={styles.profileContainer} behavior='position'>
                                <View style={styles.formContainer}>
                                    <FormLabel
                                    labelStyle={{textAlign: 'left'}}>
                                        User Name
                                    </FormLabel>
                                    <FormInput
                                        leftIcon={
                                            <Icon
                                                name='envelope-o'
                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={username}
                                        keyboardAppearance='light'
                                        autoFocus={false}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        inputStyle={{marginLeft: 10}}
                                        containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        editable={false}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Password
                                    </FormLabel>
                                    <FormInput
                                        leftIcon={
                                            <SimpleIcon
                                                name='lock'
                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={password}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        returnKeyType='next'
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Password'}
                                        ref={input => this.passwordInput = input}
                                        onSubmitEditing={() => this.confirmationInput.focus()}
                                        onChangeText={(password) => this.setState({password})}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Password Verification
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'

                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={passwordConfirmation}
                                        secureTextEntry={true}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Confirm password'}
                                        ref={input => this.confirmationInput = input}
                                        onSubmitEditing={this.signUp}
                                        onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        First Name
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'
                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={firstname}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'first name'}
                                        ref={input => this.confirmationInput = input}
                                        onChangeText={firstname => this.setState({ firstname })}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Last Name
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'

                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={lastname}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'first name'}
                                        ref={input => this.confirmationInput = input}
                                        onChangeText={lastname => this.setState({ lastname })}
                                        style={styles.input}
                                    />
                                    <FormLabel
                                        labelStyle={{textAlign: 'left'}}>
                                        Phone
                                    </FormLabel>
                                    <FormInput
                                        icon={
                                            <SimpleIcon
                                                name='lock'

                                                color='rgba(0, 0, 0, 0.38)'
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={phone}
                                        keyboardAppearance='light'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        keyboardType='default'
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'first name'}
                                        ref={input => this.confirmationInput = input}
                                        onChangeText={phone => this.setState({ phone })}
                                        style={styles.input}
                                    />

                                    <Button
                                        buttonStyle={styles.profileButton}
                                        containerStyle={{marginTop: 32, flex: 0}}
                                        activeOpacity={0.8}
                                        title='UPDATE'
                                        onPress={this.update}
                                        titleStyle={styles.profileTextButton}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                        :
                        <Text>Loading...</Text>
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'white',
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    profileButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems:'center',
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        fontSize:20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
});
