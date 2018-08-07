import 'es6-symbol/implement'
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
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
import {Font} from 'expo';
import {FormInput, Button} from 'react-native-elements'
import {TextInput} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('./assets/images/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({selected}) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={selected && styles.selected}/>
        </View>
    );
};

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            fontLoaded: false,
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
        };
        this.selectCategory = this.selectCategory.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.next_page = this.next_page.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'georgia': require('./assets/fonts/Georgia.ttf'),
            'regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            'light': require('./assets/fonts/Montserrat-Light.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    login() {
        const {
            username,
            password,
        } = this.state;
        if (username.length < 1 || password.length < 1)
            alert("Please enter the username and password");
        else {
            this.setState({isLoading: true});
            fetch("https://ms-project-java-server.herokuapp.com/api/student/login",
                {
                    body: JSON.stringify({"username": username, "password": password}),
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST'
                })
                .then((response) => {
                    return response.json()
                })
                .then((user) => {
                    if (user.username !== undefined)
                        this.props.navigation.navigate("My Courses", {courseType: "MY_COURSE"});
                    else
                        alert("The UserName/Password is incorrect.")
                });
            this.setState({isLoading: false});
        }
    }

    signUp() {
        const {
            username,
            password,
            passwordConfirmation,
        } = this.state;
        if (username.length < 1 || password.length < 1)
            alert("Please enter the username and password");
        else if (passwordConfirmation != password)
            alert("password does not match");
        else {
            this.setState({isLoading: true});
            fetch("https://ms-project-java-server.herokuapp.com/api/student/register",
                {
                    body: JSON.stringify({"username": username, "password": password}),
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST'
                })
                .then((response) => {
                    return response.json()
                })
                .then((user) => {
                    console.log(user)
                    if (user.error === "Conflict")
                        alert("The UserName is already taken")
                    else if (user.username === username)
                        this.props.navigation.navigate("My Courses", {courseType: "MY_COURSE"})
                    else
                        alert("Please enter valid details")
                })
            this.setState({isLoading: false});
        }
    }

    next_page() {
        this.props.navigation.navigate('My Courses');
    }

    render() {
        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            username,
            password,
            passwordConfirmation,
        } = this.state;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    {this.state.fontLoaded ?
                        <View>
                            <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
                                <View style={styles.titleContainer}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.titleText}>Student</Text>
                                    </View>
                                    <View style={{marginTop: -10, marginLeft: 10}}>
                                        <Text style={styles.titleText}>World</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Button
                                        disabled={isLoading}
                                        clear
                                        activeOpacity={0.7}
                                        onPress={() => this.selectCategory(0)}
                                        containerStyle={{flex: 1}}
                                        titleStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
                                        title={'Login'}
                                    />
                                    <Button
                                        disabled={isLoading}
                                        clear
                                        activeOpacity={0.7}
                                        onPress={() => this.selectCategory(1)}
                                        containerStyle={{flex: 1}}
                                        titleStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
                                        title={'Sign up'}
                                    />
                                </View>
                                <View style={styles.rowSelector}>
                                    <TabSelector selected={isLoginPage}/>
                                    <TabSelector selected={isSignUpPage}/>
                                </View>
                                <View style={styles.formContainer}>
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
                                        returnKeyType='next'
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'User Name'}
                                        containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                        onChangeText={username => this.setState({username})}
                                        style={styles.input}
                                    />
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
                                        returnKeyType={isSignUpPage ? 'next' : 'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Password'}
                                        ref={input => this.passwordInput = input}
                                        onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
                                        onChangeText={(password) => this.setState({password})}
                                        errorMessage={isPasswordValid ? null : 'Please enter at least 8 characters'}
                                        style={styles.input}
                                    />
                                    {isSignUpPage &&
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
                                        onChangeText={passwordConfirmation => this.setState({passwordConfirmation})}
                                        errorMessage={isConfirmationValid ? null : 'Please enter the same password'}
                                        style={styles.input}
                                    />}
                                    <Button
                                        buttonStyle={styles.loginButton}
                                        containerStyle={{marginTop: 32, flex: 0}}
                                        activeOpacity={0.8}
                                        title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                                        onPress={isLoginPage ? this.login : this.signUp}
                                        titleStyle={styles.loginTextButton}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                </View>
                            </KeyboardAvoidingView>
                            <View style={styles.helpContainer}>
                                <Button
                                    title={'next step'}
                                    titleStyle={{color: 'white'}}
                                    buttonStyle={{backgroundColor: 'transparent'}}
                                    underlayColor='transparent'
                                    onPress={() => this.next_page()}
                                />
                            </View>
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
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
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
        alignItems: 'center',
    },
    loginText: {
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
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
});
